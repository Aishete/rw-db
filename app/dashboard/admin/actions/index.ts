"use server";

import { readUserSession } from "@/lib/actions";
import { createSupbaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createAdmin(data: {
  name: string;
  role: "Admin" | "Super-Admin";
  status: "active" | "resigned";
  email: string;
  password: string;
  confirm: string;
}) {
  const { data: userSession } = await readUserSession();
  console.log(userSession.session?.user.user_metadata.role);
  if (userSession.session?.user.user_metadata.role !== "Super-Admin") {
    throw new Error(
      "You do not have permission to create an admin, contact your super admin."
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
      },
    });

  if (createUserError) {
    throw createUserError;
  }

  const { error: insertAdminError } = await supabase
    .from("admin")
    .insert({ name: data.name, id: user?.user.id });

  if (insertAdminError) {
    throw insertAdminError;
  }

  const { error: insertPermissionError } = await supabase
    .from("Admin_permission")
    .insert({
      role: data.role,
      admin_id: user?.user.id,
      Status: data.status,
    });

  if (insertPermissionError) {
    throw insertPermissionError;
  }
  revalidatePath("/dashboard/admin");
  return { user };
}

export async function updateAdminById(id: string) {
  console.log("update member");
}
export async function deleteAdminById(
  user_id: string
): Promise<{ error?: string; message?: string }> {
  const { data: userSession } = await readUserSession();
  console.log(userSession.session?.user.user_metadata.role);
  if (userSession.session?.user.user_metadata.role !== "Super-Admin") {
    return {
      error:
        "You do not have permission to delete an admin, contact your super admin.",
    };
  }
  try {
    const supabaseAdmin = await createSupbaseAdmin();

    const deleteUser = await supabaseAdmin.auth.admin.deleteUser(user_id);
    if (deleteUser.error) {
      return { error: deleteUser.error.message };
    } else {
      const supabase = await createSupbaseServerClient();
      const result = await supabase.from("admin").delete().eq("id", user_id);
      if (result.error) {
        return { error: result.error.message };
      }
    }
    revalidatePath("/dashboard/admin"); // revalidate the admin page
    return { message: "User deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete user: " + (error as any).message };
  }
}
export async function readAdmin() {
  unstable_noStore();
  const supabase = await createSupbaseServerClient();
  return await supabase.from("Admin_permission").select("*,admin(*)");
}
