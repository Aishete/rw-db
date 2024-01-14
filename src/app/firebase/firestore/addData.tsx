import {
  getFirestore,
  doc,
  setDoc,
  FirestoreDataConverter,
  DocumentData,
} from "firebase/firestore";
import firebase_app from "../config";
const db = getFirestore(firebase_app);

interface AddDataResult {
  result: void;
  error: Error | null;
}

export default async function addData<T>(
  collection: string,
  id: string,
  data: T,
  converter?: FirestoreDataConverter<T>
): Promise<AddDataResult> {
  let result: void | undefined = undefined;
  let error: Error | null = null;

  try {
    const dataToSet: Partial<DocumentData> = data as Partial<DocumentData>;

    // Apply the converter if provided
    const convertedData = converter ? converter.toFirestore(data) : dataToSet;

    result = await setDoc(doc(db, collection, id), convertedData, {
      merge: true,
    });
  } catch (e) {
    error = e as Error;
  }

  return { result, error };
}
