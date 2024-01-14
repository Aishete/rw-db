import firebase_app from "@/app/firebase/config";
import {
  setDoc,
  doc,
  getFirestore,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { v4 as uuid_v4 } from "uuid"; // import the uuid function
const db = getFirestore(firebase_app);
import { toast } from "sonner";

interface FormValues {
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
  village: string;
}

export async function onSubmit(values: FormValues) {
  try {
    const userId = uuid_v4();
    const candidateRef = doc(db, "candidate", userId); // Use the generated userId as the document ID

    // Add a new document to the "candidate" collection with the generated userId
    await setDoc(candidateRef, {
      recuitercode: values.recuitercode,
      recuitername: values.recuitername,
      referral: values.referral,
      candidatenameeng: values.candidatenameeng,
      candidatenamekh: values.candidatenamekh,
      gender: values.gender,
      dateOfbirth: values.dateOfbirth,
      phone: values.phone,
      province: values.province,
      district: values.district,
      village: values.village,
    });
    console.log(values);
    toast("You have Submitted");
  } catch (error) {
    toast("Something wrong, Please check your network and try again!!");
    console.error("Error adding/updating document:", error);
  }
}
