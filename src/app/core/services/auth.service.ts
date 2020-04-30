import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>;

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return firestore.doc<UserModel>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  // Desestruturando o objeto para designar automaticamente os valores
  private updateUserData({ uid, email, displayName, photoURL, roles }: UserModel) {
    const userRef: AngularFirestoreDocument<UserModel> = this.firestore.doc(`users/${uid}`);

    const data: UserModel = {
      uid,
      email,
      displayName,
      photoURL,
      roles: {
        client: true
      }
    };
    // Merge: true só vai mudar os dados novos, assim evitando que ele limpe todo o usuário
    return userRef.set(data, { merge: true})
  }

  private checkAuthorization(user: UserModel, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      return true;
    }
  }

  canRead(user: UserModel): boolean {
    const allowed = ['client', 'admin'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: UserModel): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: UserModel): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }
}
