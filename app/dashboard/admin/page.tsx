"use client";
import React, { useState, useEffect } from "react";
import MemberTable from "./components/MemberTable";
import SearchMembers from "./components/SearchMembers";
import { CreateA } from "./components/create/CreateAdmin";
import { useUserStore } from "@/lib/store/user";

export default function Admin() {
  const user = useUserStore.getState().user;
  const isUserHaveAccess =
    user?.role === "admin" || user?.role === "Super-Admin";
  const isUserHavenotAccess =
    user?.role !== "admin" && user?.role !== "Super-Admin";
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Admin</h1>
      <div className="flex gap-2">
        <SearchMembers />
        <CreateA />
      </div>
      <MemberTable />
    </div>
  );
}
