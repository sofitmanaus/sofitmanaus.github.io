import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()
const db = admin.firestore()

export interface Users {
  emails?: Array<string>
}

exports.aggregate = functions.region('us-central1').firestore
  .document('users/{userId}').onCreate(async(snapshot, context) => {
    const user = snapshot.data()

    const aggRef: FirebaseFirestore.DocumentReference<Users> = db.doc('aggregation/users')

    const aggDoc = await aggRef.get()
    const aggData = aggDoc.data()

    if (aggData && user) {
      console.log(aggData, user)
      if (user.email) aggData.emails?.push(user.email)
      return aggRef.set(aggData, {merge: true})
    } else { return }
  })
