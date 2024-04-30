import { db } from '@src/firebase.config';
import {
  CollectionReference,
  QueryConstraint,
  collection as collectionFirestore,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';

class FirestoreService<Schema> {
  private readonly collection: CollectionReference;
  constructor(collectionName: string) {
    this.collection = collectionFirestore(db, collectionName);
  }
  fetchDocuments = async (...queriesConstraints: QueryConstraint[]) => {
    const q = query(this.collection, ...queriesConstraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
    return {id: doc.id, ...doc.data()} as Schema;
    })
  };

  get = async (id: string) => {
    const snap = await getDoc(doc(db, this.collection.id, id));
    return {id: snap.id, ...snap.data()}
  }
}
