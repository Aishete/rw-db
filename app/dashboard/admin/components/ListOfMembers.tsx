import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditMember from "./edit/EditAdmin";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/lib/store/user";
import { read } from "fs";
import { readAdmin } from "../actions";
import { AdminPer } from "@/lib/type";
import DeleteForm from "./deleteform";

export default async function ListOfMembers() {
  const user = useUserStore.getState().user;
  const isUserHaveAccess = user?.user_metadata.role === "Super-Admin";
  const { data: admins } = await readAdmin();
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {(admins as AdminPer)?.map((admins, index) => {
        return (
          <div
            className=" grid grid-cols-5  rounded-sm  p-3 align-middle font-normal"
            key={index}
          >
            <h1>{admins.admin.name}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  {
                    "border-green-500 text-green-600 bg-green-200":
                      admins.role === "Super-Admin",
                    "border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
                      admins.role === "Admin",
                  }
                )}
              >
                {admins.role}
              </span>
            </div>
            <h1>{new Date(admins.created_at).toDateString()}</h1>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
                  {
                    "text-green-600 px-4 dark:border-green-400 bg-green-200":
                      admins.Status === "active",
                    "text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
                      admins.Status === "resigned",
                  }
                )}
              >
                {admins.Status}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              {isUserHaveAccess && <DeleteForm user_id={admins.admin.id} />}{" "}
              <EditMember isAdmin={isUserHaveAccess} admins={[admins]} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
