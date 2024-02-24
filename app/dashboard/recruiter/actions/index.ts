"use server";

import { readUserSession } from "@/lib/actions";
import { createSupbaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createRecuiterA(data: {
  name: string;
  recruiter_Code: string;
  role: "Recruiter";
  status: "active" | "resigned";
  email: string;
  password: string;
  confirm: string;
}) {
  const { data: userSession } = await readUserSession();

  if (
    userSession.session?.user.user_metadata.role !== "Super-Admin" &&
    userSession.session?.user.user_metadata.role !== "Admin"
  ) {
    throw new Error(
      "You do not have permission to create an Recroiter, contact your super admin or admin."
    );
  }

  if (data.password !== data.confirm) {
    throw new Error("Password and confirmation do not match");
  }

  const supabase = await createSupbaseAdmin();

  const { data: user, error: createUserError } =
    await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        role: data.role,
        name: data.name,
        email: data.email,
      },
    });

  if (createUserError) {
    throw createUserError;
  }

  const { error: insertAdminError } = await supabase.from("recruiter").insert({
    recruiter_name: data.name,
    recruiter_code: data.recruiter_Code,
    id: user?.user.id,
    email: data.email,
  });

  if (insertAdminError) {
    throw insertAdminError;
  }

  const { error: insertPermissionError } = await supabase
    .from("Recruiter_permission")
    .insert({
      role: data.role,
      recruiter_id: user?.user.id,
      Status: data.status,
    });

  if (insertPermissionError) {
    throw insertPermissionError;
  }
  revalidatePath("/dashboard/recruiter"); // revalidate the admin page

  return { user };
}

export async function updateRecruiterBasicById(
  id: string,
  data: {
    recruiter_name: string;
    recruiter_code: string;
  }
) {
  const supabaseAdmin = await createSupbaseAdmin();
  const result = await supabaseAdmin.auth.admin.updateUserById(id, {
    user_metadata: { name: data.recruiter_name },
  });
  if (result.error) {
    throw result.error;
  } else {
    const supabase = await createSupbaseServerClient();
    const { error } = await supabase
      .from("recruiter")
      .update({
        recruiter_name: data.recruiter_name,
        recruiter_code: data.recruiter_code,
      })
      .eq("id", id);
    if (error) {
      throw error;
    } else {
    }
    console.log(result);

    return { result }; // Return the updated data
  }
}
export async function updateRecruiterAdvanceById(
  recuiter_id: string,
  user_id: string,
  data: { role: "Recruiter"; Status: "active" | "resigned" }
) {
  const supabaseAdmin = await createSupbaseAdmin();
  const result = await supabaseAdmin.auth.admin.updateUserById(user_id, {
    user_metadata: { role: data.role },
  });
  if (result.error) {
    throw result.error;
  } else {
    const supabase = await createSupbaseServerClient();
    const { data: updatedData, error } = await supabase
      .from("Recruiter_permission")
      .update(data)
      .eq("id", recuiter_id);
    if (error) {
      throw error;
    } else {
      return { updatedData }; // Return the updated data
    }
  }
}

export async function updateRecruiterAccountById(
  user_id: string,
  data: {
    email: string;
    password?: string | undefined;
  }
) {
  let dataObj: {
    email: string;
    password?: string | undefined;
  } = { email: data.email };
  if (data.password) {
    dataObj.password = data.password;
  }
  const supabaseAdmin = await createSupbaseAdmin();
  const result = await supabaseAdmin.auth.admin.updateUserById(
    user_id,
    dataObj
  );

  if (result.error) {
    throw result.error;
  } else {
    const supabaseAdmin = await createSupbaseAdmin();
    const result = await supabaseAdmin.auth.admin.updateUserById(user_id, {
      user_metadata: { email: data.email },
    });

    if (result.error) {
      throw result.error;
    } else {
      const supabase = await createSupbaseServerClient();
      const result = await supabase
        .from("recruiter") //ensure the table name is correct
        .update({ email: data.email })
        .eq("id", user_id);

      if (result.error) {
        return { error: result.error.message };
      } else {
        // Return the updated data

        return { result };
      }
    }
  }
}

export async function deleteRecruiterById(
  user_id: string
): Promise<{ error?: string; message?: string }> {
  try {
    const supabaseAdmin = await createSupbaseAdmin();
    const deleteUser = await supabaseAdmin.auth.admin.deleteUser(user_id);
    if (deleteUser.error) {
      return { error: deleteUser.error.message };
    } else {
      const supabase = await createSupbaseServerClient();
      const result = await supabase
        .from("recruiter")
        .delete()
        .eq("id", user_id);
      if (result.error) {
        return { error: result.error.message };
      }
    }
    revalidatePath("/dashboard/recruiter"); // revalidate the admin page
    return { message: "User deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete user: " + (error as any).message };
  }
}
export async function readRecruiter() {
  unstable_noStore();
  const supabase = await createSupbaseServerClient();
  return await supabase.from("Recruiter_permission").select("*,recruiter(*)");
}
