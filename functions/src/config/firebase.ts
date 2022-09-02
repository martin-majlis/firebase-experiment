// The Firebase Admin SDK to access Firestore.
import admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();
export { admin, db, storage };
