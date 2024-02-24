import React from "react";
import NavLinks from "./NavLinks";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import ModeToggle from "../candidate/components/ToggleDarkMode";
import { SignOut } from "./alertbox";
import { useUserStore } from "@/lib/store/user";
import NavRecruiterLinks from "./Recuitertable";
import { SignOutform } from "./SignOut";
export default function SideNav() {
  return <SideBar className=" hidden lg:block dark:bg-graident-dark flex-1" />;
}

export const SideBar = ({ className }: { className?: string }) => {
  const user = useUserStore.getState().user;
  const isUserHaveAccess =
    user?.user_metadata.role === "Admin" ||
    user?.user_metadata.role === "Super-Admin";
  const isUserHavenotAccess =
    user?.user_metadata.role !== "Admin" &&
    user?.user_metadata.role !== "Super-Admin";
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
        <div className=" mt-11">
          <div className="">
            <div className="mb-4">
              <div className="space-y-1">
                {user && user.user_metadata && (
                  <>
                    <h4 className="text-sm font-medium leading-none">
                      {user.user_metadata.name}
                      {"   "}({user.user_metadata.role})
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {user.user_metadata.email}
                      {"   "}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <SignOut />
      </div>
    </div>
  );
};
