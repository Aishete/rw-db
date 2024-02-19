"use server";

import { readUserSession } from "@/lib/actions";
import { createSupbaseAdmin } from "@/lib/supabase";

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
  if (
    userSession.session?.user.user_metadata.role !== "Super-Admin" ||
    userSession.session?.user.user_metadata.role !== "Admin"
  ) {
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
  return { user };
}

export async function updateAdminById(id: string) {
  console.log("update member");
}
export async function deleteAdminById(id: string) {}
export async function readMembers() {}
