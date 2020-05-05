import { Injectable } from '@angular/core'
import { AngularFireAuth } from "@angular/fire/auth"
import { Observable, of } from 'rxjs'
import { UserModel } from '../models/user.model'
import { AngularFirestore, DocumentData } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserDataService } from './user-data.service'
import { auth } from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private userData: UserDataService) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return firestore.doc<UserModel>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  async anonymousLogin() {
    const result = await this.afAuth.signInAnonymously()
    return this.updateUserData(result.user)
  }

  async linkGoogleAccount() {
    const provider = new auth.GoogleAuthProvider()
    const user = await this.afAuth.currentUser
    const credential = await user.linkWithPopup(provider)
    return this.updateUserData(credential.user)
  }

  async unlinkGoogleAccount() {
    const provider = new auth.GoogleAuthProvider()
    const user = await this.afAuth.currentUser
    const result = await user.unlink(provider.providerId)
    return this.updateUserData(result)
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    return this.updateUserData(credential.user)
  }

  async facebookSignIn() {
    const user = await this.linkFacebook()
    if (!user.emailVerified)
    {
      this.afAuth.signOut()
      throw new Error("Você ainda não verificou seu email.");
    } else {
      return this.updateUserData(user)
    }
  }

  async emailSignUp(user: UserModel) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    this.sendVerificationEmail()
    return this.updateUserData(credential.user, user.password, user.firstName, user.lastName)
  }

  async getSignInMethods(email:string) {
    return await this.afAuth.fetchSignInMethodsForEmail(email)
  }

  async emailSignIn(user: UserModel) {
    const credential = await this.afAuth.signInWithEmailAndPassword(user.email, user.password)
    if (credential.user.emailVerified !== true) {
      throw new Error("Você ainda não verificou seu email.");
    } else {
      const userRef = await this.firestore.doc(`users/${credential.user.uid}`).get().toPromise()
      const userData = userRef.data()

      const data: UserModel = {
        email: userData.email,
        displayName: userData.displayName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        photoURL: userData.photoURL
      }
      this.userData.save(data)
      return credential
    }
  }

  async getEmailPassCred(email: string, password: string) {
    return auth.EmailAuthProvider.credential(email, password)

  }

  async linkCredential(credential: auth.AuthCredential) {
    return (await this.afAuth.currentUser).linkWithCredential(credential)
  }

  async linkFacebook() {
    const provider = new auth.FacebookAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    return credential.user
  }

  async sendVerificationEmail() {
    const user = await this.afAuth.currentUser
    return await user.sendEmailVerification()
  }

  async signOut() {
    this.userData.remove()
    await this.afAuth.signOut()
  }

  async getCurrentUser() {
    return await this.afAuth.currentUser
  }

  // Desestruturando o objeto para designar automaticamente os valores
  private updateUserData({ uid, email, displayName, photoURL }: UserModel, password?: string, firstName?: string, lastName?: string) {
    const userRef: AngularFirestoreDocument<UserModel> = this.firestore.doc(`users/${uid}`)
    if (!password) {
      firstName = displayName.split(" ")[0]
      lastName = displayName.substring(displayName.lastIndexOf(" ") + 1)
    }

    if (!photoURL) {
      photoURL = '/assets/images/anonymous.png'
    }

    const data: UserModel = {
      uid,
      email,
      displayName,
      firstName,
      lastName,
      photoURL,
      roles: {
        client: true
      }
    }
    this.userData.save({email, displayName, firstName, lastName, photoURL})
    // Merge: true só vai mudar os dados novos, assim evitando que ele limpe todo o usuário
    return userRef.set(data, { merge: true})
  }

  isEmailUnique(email: string): Observable<DocumentData> {
    const aggRef = this.firestore.doc('aggregation/users').get()
    return aggRef;
  }

  async resetPassword(email: string) {
    return await this.afAuth.sendPasswordResetEmail(email)
  }

  private checkAuthorization(user: UserModel, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }

  canRead(user: UserModel): boolean {
    const allowed = ['client', 'admin']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: UserModel): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: UserModel): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }
}
