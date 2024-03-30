"use client";
import { useRouter } from "next/navigation";
import Admin from "./admin";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import localforage from "localforage";
<Helmet>
  <meta
    name="viewport"
    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
  />
</Helmet>;
export default function Page() {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Admin</h1>
      <Admin />
    </div>
  );
}
