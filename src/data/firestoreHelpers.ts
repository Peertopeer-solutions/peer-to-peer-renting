import { db } from '@src/firebase.config';
import {
  CollectionReference,
  QueryConstraint,
  collection as collectionFirestore,
  getDocs,
  query,
} from 'firebase/firestore';

class FirestoreService {
  private readonly collection: CollectionReference;
  constructor(collectionName: string) {
    this.collection = collectionFirestore(db, collectionName);
  }
  fetchDocuments = async (...queriesConstraints: QueryConstraint[]) => {
    const q = query(this.collection, ...queriesConstraints);
    const snapshot = await getDocs(q);
  };
}
