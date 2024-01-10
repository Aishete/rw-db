"use client";

import Link from "next/link";
import NavLinks from "@/app/nav/nav-link";
import AcmeLogo from "@/components/ui/rw_db_logo";

import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { LogoutUsers } from "@/components/ui/LogUsers";

interface PageProps {}

const SideNav: React.FC<PageProps> = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-black shadow-2xl p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <LogoutUsers />
        </form>
      </div>
    </div>
  );
};

export default SideNav;
