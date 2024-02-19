import React from "react";
import NavLinks from "./NavLinks";

import { cn } from "@/lib/utils";
import ModeToggle from "../candidate/components/ToggleDarkMode";
import { Button } from "@/components/ui/button";
import SignOut from "./SignOut";
import { useUserStore } from "@/lib/store/user";
import NavRecruiterLinks from "./Recuitertable";
export default function SideNav() {
  return <SideBar className=" hidden lg:block dark:bg-graident-dark flex-1" />;
}

export const SideBar = ({ className }: { className?: string }) => {
  const user = useUserStore.getState().user;
  const isUserHaveAccess =
    user?.role === "Admin" || user?.role === "Super-Admin";
  const isUserHavenotAccess =
    user?.role !== "Admin" && user?.role !== "Super-Admin";
  return (
    <div className={className}>
      <div
        className={cn(
          "h-full w-full lg:w-96 lg:p-10 space-y-5 lg:border-r flex flex-col "
        )}
      >
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-3xl font-bold">RW-Database</h1>

            <ModeToggle />
          </div>
          {isUserHaveAccess && <NavLinks />}
          {isUserHavenotAccess && <NavRecruiterLinks />}
        </div>
        <div className="">
          <SignOut />
        </div>
      </div>
    </div>
  );
};
