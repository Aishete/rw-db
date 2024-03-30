"use client";
import React, { useEffect } from "react";
import AuthForm from "./components/AuthForm";
import { fetchUserMetadata } from "./usermatadata";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { string } from "zod";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const usermetadata2 = await fetchUserMetadata();

      try {
        if (usermetadata2?.role === "Recruiter") {
          router.push("/dashboard/candidate");
        } else if (
          usermetadata2?.role === "Admin" ||
          usermetadata2?.role === "Super-Admin"
        ) {
          router.push("/dashboard/admin");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <AuthForm />
    </div>
  );
}
