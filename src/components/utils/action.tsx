// Import the necessary modules

import firebase_app from "@/app/firebase/config";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { v4 as uuid_v4 } from "uuid";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/router";
export type FormValues = {
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
  CreateDate: Date;
};
export default async function onSubmit(values: FormValues) {
  try {
    const db = getFirestore(firebase_app);
    const userId = uuid_v4();
    const candidateRef = doc(db, "candidate", userId);

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
      commune: values.commune,
      village: values.village,
      CreateDate: values.CreateDate,
    });

    toast("You have Submitted");
  } catch (error) {
    toast("Something wrong, Please check your network and try again!!");
    console.error("Error adding/updating document:", error);
  }
}
export type FormValuesR = {
  id: string;
  referral: string;
  recuitercode: string;
  recuitername: string;
  CreateDate: Date;
};
interface FormValuesRE {
  referral: string;
  recuitercode: string;
  recuitername: string;
  CreateDate: Date;
}

export async function onSubmitR(values: FormValuesRE) {
  try {
    const userId = uuid_v4();
    const db = getFirestore(firebase_app);
    const candidateRef = doc(db, "recruiter", userId);

    await setDoc(candidateRef, {
      recuitercode: values.recuitercode,
      recuitername: values.recuitername,
      referral: values.referral,
      CreateDate: values.CreateDate,
    });

    // Show a success message
    toast("You have Submitted");

    // Clear the form
  } catch (error) {
    // Show an error message
    toast("Something wrong, Please check your network and try again!!");
    console.error("Error adding/updating document:", error);
  }
}
