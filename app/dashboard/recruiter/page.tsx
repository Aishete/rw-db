"use client";
import { useRouter } from "next/navigation";
import Recruiter from "./recruiter";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import localforage from "localforage";
import { user_metadata } from "@/lib/type";
<Helmet>
  <meta
    name="viewport"
    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
  />
</Helmet>;
export default function Page() {

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Recruiter</h1>
      <Recruiter />
    </div>
  );
}