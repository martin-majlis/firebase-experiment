import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  doc,
  getFirestore,
  query,
  getDocs,
  getDoc,
  collection,
  where,
  addDoc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoXGd5el9MP0g5JK7SdLJEKdz_1_YolZQ",
  authDomain: "fir-experiment-e213a.firebaseapp.com",
  projectId: "fir-experiment-e213a",
  storageBucket: "fir-experiment-e213a.appspot.com",
  messagingSenderId: "177778262094",
  appId: "1:177778262094:web:d76bee94ca3b8f68f1431f",
  measurementId: "G-48375VW1J2",
};

type Error = {
  message: string;
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};

const logout = () => {
  signOut(auth);
};

// -------------------------------------------

class Entry {
  user_uid: string | null;
  user_name: string | null;
  date: Date;
  value: string;

  constructor(
    user_uid: string | null,
    user_name: string | null,
    date: Date,
    value: string
  ) {
    this.user_uid = user_uid;
    this.user_name = user_name;
    this.date = date;
    this.value = value;
  }

  toString() {
    return (
      this.user_uid +
      ", " +
      this.user_name +
      ", " +
      this.date +
      ", " +
      this.value
    );
  }
}

class EntryWithId {
  id: string;
  entry: Entry;

  constructor(id: string, entry: Entry) {
    this.id = id;
    this.entry = entry;
  }
}

const entryConverter = {
  toFirestore: (entry: Entry): DocumentData => {
    return {
      user_uid: entry.user_uid,
      user_name: entry.user_name,
      date: entry.date,
      value: entry.value,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);
    return new Entry(
      data.user_uid,
      data.user_name,
      data.date.toDate(),
      data.value
    );
  },
};

const getEntries = async () => {
  const q = query(collection(db, "entries").withConverter(entryConverter));
  const snapShots = await getDocs(q);
  return snapShots.docs.map((doc) => new EntryWithId(doc.id, doc.data()));
};

const addEntryWithValue = async (val: string) => {
  const entry = new Entry(
    auth.currentUser?.uid || null,
    auth.currentUser?.displayName || null,
    new Date(),
    val
  );
  return await addEntry(entry);
};

const addEntry = async (entry: Entry) => {
  const docRef = await addDoc(
    collection(db, "entries").withConverter(entryConverter),
    entry
  );
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};

const getEntry = async (refId: string) => {
  const docRef = doc(db, "entries", refId).withConverter(entryConverter);
  console.log("Document: ", refId, "Ref: ", docRef);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  Entry,
  EntryWithId,
  getEntries,
  addEntry,
  addEntryWithValue,
  getEntry,
};
