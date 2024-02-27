import React from "react";
import AuthForm from "./components/AuthForm";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function page() {
  const { data: userSession } = await readUserSession();
  console.log(userSession.session?.user.user_metadata.role);
  if (userSession.session?.user.user_metadata.role === "Recruiter") {
    return redirect("/dashboard/candidate");
  } else if (
    userSession.session?.user.user_metadata.role === "Admin" ||
    userSession.session?.user.user_metadata.role === "Super-Admin"
  ) {
    return redirect("/dashboard/admin");
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthForm />
    </div>
  );
}
