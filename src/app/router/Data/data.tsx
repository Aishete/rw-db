import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { toast } from "sonner";
import { FormValuesR } from "@/components/utils/action";
const db = getFirestore();
const handleDelete = async ({ id }: { id: string }) => {
  // Perform the deletion
  await deleteDoc(doc(db, "candidate", id));
};
export interface Candidate {
  id: string;
  referral: string;
  recuitercode: string;
  recuitername: string;
  candidatenameeng: string;
  candidatenamekh: string;
  phone: string;
  dateOfbirth: Date;
  gender: string;
  province: string;
  district: string;
  commune: string;
  village: string;
}

export async function fetchRecruiterData(
  setrecruiter: React.Dispatch<React.SetStateAction<FormValuesR[]>>
) {
  try {
    const querySnapshot = await getDocs(collection(db, "recruiter"));
    const recruiterData: FormValuesR[] = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as FormValuesR;
    });

    setrecruiter(recruiterData);
  } catch (error) {
    console.error("Error fetching candidate data:", error);
  }
}

export async function fetchCandidateData(
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>
) {
  try {
    const querySnapshot = await getDocs(collection(db, "candidate"));
    const candidateData: Candidate[] = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        dateOfbirth: doc.data().dateOfbirth?.toDate(),
      } as Candidate;
    });

    setCandidates(candidateData);
  } catch (error) {
    console.error("Error fetching candidate data:", error);
  }
}

export async function fetchCandidateDataR(
  id: string,
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>
) {
  try {
    const querySnapshot = await getDocs(collection(db, "candidate", id));
    const candidateData: Candidate[] = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        dateOfbirth: doc.data()?.dateOfbirth?.toDate(),
      } as Candidate;
    });

    setCandidates(candidateData);
  } catch (error) {
    console.error("Error fetching candidate data:", error);
  }
}
