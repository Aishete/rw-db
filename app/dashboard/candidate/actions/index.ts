"use server";

import { readUserSession } from "@/lib/actions";
import { createSupbaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
export async function role() {
  const { data: userSession } = await readUserSession();
  if (
    userSession.session?.user.user_metadata.role === "Super-Admin" ||
    userSession.session?.user.user_metadata.role === "Admin"
  ) {
    const useUserAccess = false;
    return useUserAccess;
  } else {
    const useUserAccess = true;
    return useUserAccess;
  }
}

export async function createCandidate(data: {
  referral: string;
  candidatenameeng: string;
  candidatenamekh: string;
  phone: string;
  dateOfbirth: Date;
  gender: "Male" | "Female";
  province: string;
  district: string;
  commune: string;
  village: string;
}) {
  const { data: userSession } = await readUserSession();

  // if (
  //   userSession.session?.user.user_metadata.role !== "Super-Admin" &&
  //   userSession.session?.user.user_metadata.role !== "Admin"
  // ) {
  //   throw new Error(
  //     "You do not have permission to create an Recroiter, contact your super admin or admin."
  //   );
  // }

  const supabase = await createSupbaseServerClient();

  // const { data: user, error: createUserError } =
  //   await supabase.auth.admin.createUser({
  //     email: data.email,
  //     password: data.password,
  //     email_confirm: true,
  //     user_metadata: {
  //       role: data.role,
  //       name: data.name,
  //       email: data.email,
  //     },
  //   });

  // if (createUserError) {
  //   throw createUserError;
  // }

  const { error: insertCandidateError } = await supabase
    .from("Candidates")
    .insert({
      referral: data.referral,
      candidatenameeng: data.candidatenameeng,
      candidatenamekh: data.candidatenamekh,
      phone: data.phone,
      dateOfbirth: data.dateOfbirth,
      gender: data.gender,
      province: data.province,
      district: data.district,
      commune: data.commune,
      village: data.village,
    })
    .single();

  if (insertCandidateError) {
    throw insertCandidateError;
  }
  return { insertCandidateError };
}

export async function createCandidateByAdmin(data: {
  referral: string;
  candidatenameeng: string;
  candidatenamekh: string;
  phone: string;
  dateOfbirth: Date;
  gender: "Male" | "Female";
  province: string;
  district: string;
  commune: string;
  village: string;
  recruiterCID: string;
}) {
  const supabase = await createSupbaseServerClient();
  const { error: insertCandidateError } = await supabase
    .from("Candidates")
    .insert({
      referral: data.referral,
      candidatenameeng: data.candidatenameeng,
      candidatenamekh: data.candidatenamekh,
      phone: data.phone,
      dateOfbirth: data.dateOfbirth,
      gender: data.gender,
      province: data.province,
      district: data.district,
      commune: data.commune,
      village: data.village,
      recruiterCID: data.recruiterCID,
    })
    .single();

  if (insertCandidateError) {
    throw insertCandidateError;
  }
  return { insertCandidateError };
}

export async function updateCandidateRecruiterById(
  id: string,
  data: {
    referral: string;
    candidatenameeng: string;
    candidatenamekh: string;
    phone: string;
    dateOfbirth: Date; // Change this to string
    gender: "Male" | "Female";
    province: string;
    district: string;
    commune: string;
    village: string;
  }
) {
  const supabase = await createSupbaseServerClient();

  // Convert dateOfbirth to Date object
  const dateOfBirthDate = new Date(data.dateOfbirth);
  if (dateOfBirthDate.toString() === "Invalid Date") {
    return { error: "Invalid date of birth" };
  }

  // Replace dateOfbirth string with Date object

  const result = await supabase
    .from("Candidates") //ensure the table name is correct
    .update(data)
    .eq("id", id);

  if (result.error) {
    return { error: result.error.message };
  } else {
    // Return the updated data
    return { result };
  }
}
export async function updateCandidateRecruiterByAdminId(
  id: string,
  data: {
    referral: string;
    recruiterCID: string;
    candidatenameeng: string;
    candidatenamekh: string;
    phone: string;
    dateOfbirth: Date; // Change this to string
    gender: "Male" | "Female";
    province: string;
    district: string;
    commune: string;
    village: string;
  }
) {
  const supabase = await createSupbaseServerClient();

  // Convert dateOfbirth to Date object
  const dateOfBirthDate = new Date(data.dateOfbirth);
  if (dateOfBirthDate.toString() === "Invalid Date") {
    return { error: "Invalid date of birth" };
  }

  // Replace dateOfbirth string with Date object

  const result = await supabase
    .from("Candidates") //ensure the table name is correct
    .update({
      referral: data.referral,
      recruiterCID: data.recruiterCID,
      candidatenameeng: data.candidatenameeng,
      candidatenamekh: data.candidatenamekh,
      phone: data.phone,
      dateOfbirth: data.dateOfbirth,
      gender: data.gender,
      province: data.province,
      district: data.district,
      commune: data.commune,
      village: data.village,
    })
    .eq("id", id);

  if (result.error) {
    return { error: result.error.message };
  } else {
    // Return the updated data
    return { result };
  }
}

export async function deleteCandidateById(
  id: string
): Promise<{ error?: string; message?: string }> {
  const { data: userSession } = await readUserSession();
  try {
    if (
      userSession.session?.user.user_metadata.role !== "Super-Admin" &&
      userSession.session?.user.user_metadata.role !== "Admin"
    ) {
      throw new Error(
        "You do not have permission to delete a candidate, contact your super admin or admin."
      );
    }

    const supabase = await createSupbaseServerClient();
    const result = await supabase.from("Candidates").delete().eq("id", id);
    if (result.error) {
      return { error: result.error.message };
    } else {
      return { message: "User deleted successfully" };
    }
  } catch (error) {
    return { error: "Failed to delete user: " + (error as any).message };
  }
}
export async function readCandidate() {
  unstable_noStore();
  const supabase = await createSupbaseServerClient();
  return await supabase.from("Candidates").select("*,recruiter(*)");
}
export async function readrecruiter() {
  unstable_noStore();
  const supabase = await createSupbaseServerClient();
  const { data, error } = await supabase.from("recruiter").select("*");
  return { data, error };
}
