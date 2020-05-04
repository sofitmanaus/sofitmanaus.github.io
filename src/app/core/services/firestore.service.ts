import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private storage: AngularFireStorage) { }

  public getImage(url) {
    const ref = this.storage.ref('food/' + url)
    return ref.getDownloadURL();
  }
}
