"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
exports.aggregate = functions.region('us-central1').firestore
    .document('users/{userId}').onCreate(async (snapshot, context) => {
    var _a;
    const user = snapshot.data();
    const aggRef = db.doc('aggregation/users');
    const aggDoc = await aggRef.get();
    const aggData = aggDoc.data();
    if (aggData && user) {
        console.log(aggData, user);
        if (user.email)
            (_a = aggData.emails) === null || _a === void 0 ? void 0 : _a.push(user.email);
        return aggRef.set(aggData, { merge: true });
    }
    else {
        return;
    }
});
//# sourceMappingURL=index.js.map