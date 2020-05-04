import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private firestore: AngularFirestore) {}

  createFood(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('food')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  getFood() {
    return this.firestore.collection('food').snapshotChanges();
  }
}
