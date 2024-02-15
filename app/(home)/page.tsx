"use client";

import React from "react";
import { redirect } from "next/navigation";
export default function Home() {
  React.useEffect(() => {
    redirect("/auth");
  }, []);
  return <div></div>;
}
