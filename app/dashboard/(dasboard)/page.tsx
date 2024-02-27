import React, { use, useState, useEffect } from "react";
import { role } from "../candidate/actions";
import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
export default async function Dashboard() {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.user_metadata.role === "Recruiter") {
    return redirect("/dashboard/candidate");
  } else if (
    userSession.session?.user.user_metadata.role === "Admin" ||
    userSession.session?.user.user_metadata.role === "Super-Admin"
  ) {
    return redirect("/dashboard/admin");
  }
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
