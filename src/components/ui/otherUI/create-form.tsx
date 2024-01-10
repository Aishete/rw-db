import React, { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebase_app from "@/app/firebase/config"; // Import your Firebase
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import db from "@/app/firebase/config";
import {
  Form,
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "../form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../input";
import { Divide } from "lucide-react";

interface RecordFormProps {
  // Add any props you may need
}
const formSchema = z.object({
  recId: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const RecordForm: React.FC<RecordFormProps> = () => {
  const db = getFirestore(firebase_app);

  // Initialize recId with an empty string
  const [formData, setFormData] = useState({
    recId: "",
    recuitercode: "",
    recuitername: "",
    referral: "",
    candidatenameeng: "",
    candidatenamekh: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    province: "",
    district: "",
    commune: "",
    village: "",
  });

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Add the form data to Firestore
      const recordsRef = doc(db, "records", formData.recId);
      await setDoc(recordsRef, formData);

      // Reset the form after successful submission
      setFormData({
        recId: "", // Initialize recId with an empty string
        recuitercode: "",
        recuitername: "",
        referral: "",
        candidatenameeng: "",
        candidatenamekh: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        province: "",
        district: "",
        commune: "",
        village: "",
      });
    } catch (error) {
      console.error("Error adding/updating document:", error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // ... (unchanged)
  };

  const updateDistricts = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // ... (unchanged)
  };

  return {};
};

export default RecordForm;
