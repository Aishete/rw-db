import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditMember from "./edit/EditRecruiter";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { readRecruiter } from "../actions";
import { RecruiterPer } from "@/lib/type";
import DeleteForm from "./deleteForm";

export default async function ListOfMembers() {
  const { data: recruiters } = await readRecruiter();
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {(recruiters as RecruiterPer)?.map((recruiters, index) => {
        return (
          <div
            className=" grid grid-cols-5  rounded-sm  p-3 align-middle font-normal"
            key={index}
          >
            <h1>{recruiters.recruiter.recruiter_name}</h1>
            <h1>{recruiters.recruiter.recruiter_code}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  {
                    "border-green-500 text-green-600 bg-green-200":
                      recruiters.role === "Recruiter",
                    // "border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
                    //   recruiters.role === "user",
                  }
                )}
              >
                {recruiters.role}
              </span>
            </div>
            <h1>{new Date(recruiters.created_at).toDateString()}</h1>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
                  {
                    "text-green-600 px-4 dark:border-green-400 bg-green-200":
                      recruiters.Status === "active",
                    "text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
                      recruiters.Status === "resigned",
                  }
                )}
              >
                {recruiters.Status}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <DeleteForm user_id={recruiters.recruiter.id} />{" "}
              <EditMember admins={[recruiters]} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
