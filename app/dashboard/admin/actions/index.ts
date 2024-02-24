"use server";

import { readUserSession } from "@/lib/actions";
import { useUserStore } from "@/lib/store/user";
import { createSupbaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
export async function role() {
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "Super-Admin") {
    const useUserAccess = false;
    return useUserAccess;
  } else {
    const useUserAccess = true;
    return useUserAccess;
  }
}
export async function createAdmin(data: {
  name: string;
  role: "Admin" | "Super-Admin";
  status: "active" | "resigned";
  email: string;
  password: string;
  confirm: string;
}) {
  const { data: userSession } = await readUserSession();
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
        name: data.name,
        email: data.email,
      },
    });

  if (createUserError) {
    throw createUserError;
  }

  const { error: insertAdminError } = await supabase
    .from("admin")
    .insert({ name: data.name, id: user?.user.id, email: data.email });

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

export async function updateAdminBasicById(
  id: string,
  data: {
    name: string;
  }
) {
  const supabaseAdmin = await createSupbaseAdmin();
  const result = await supabaseAdmin.auth.admin.updateUserById(id, {
    user_metadata: { name: data.name },
  });
  if (result.error) {
    throw result.error;
  } else {
    const supabase = await createSupbaseServerClient();
    const { error } = await supabase
      .from("admin")
      .update({ name: data.name })
      .eq("id", id);
    if (error) {
      throw error;
    } else {
      revalidatePath("/dashboard/admin");
    }
  }
  revalidatePath("/dashboard/admin");
  return { name: data.name }; // Return the updated data
}

export async function updateAdminAdvanceById(
  admin_id: string,
  user_id: string,
  data: {
    role: "Super-Admin" | "Admin";
    Status: "active" | "resigned";
  }
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
      .from("Admin_permission")
      .update(data)
      .eq("id", admin_id);
    if (error) {
      throw error;
    } else {
      revalidatePath("/dashboard/admin");
      return { updatedData }; // Return the updated data
    }
  }
}

export async function updateAdminAccountById(
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
      const { data: updatedData, error } = await supabase
        .from("admin")
        .update({ email: data.email })
        .eq("id", user_id);
      console.log(updatedData);
      if (error) {
        throw error;
      } else {
        revalidatePath("/dashboard/admin");
        return { updatedData }; // Return the updated data
      }
    }
  }
}
export async function deleteAdminById(
  user_id: string
): Promise<{ error?: string; message?: string }> {
  const { data: userSession } = await readUserSession();
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
