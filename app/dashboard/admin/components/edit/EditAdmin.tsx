import React, { useEffect, useState } from "react";
import DailogForm from "../DialogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import EditForm from "./EditorForm";
import { AdminPer } from "@/lib/type";
import { role } from "../../actions";
import { Console } from "console";
export default function EditMember({
  admins,
  fetchData,
}: {
  isAdmin?: boolean;
  admins: AdminPer;
  fetchData: () => void;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userIsAdmin = await role();
      setIsAdmin(userIsAdmin);
    };

    fetchUserRole();
  }, []);

  return (
    <DailogForm
      id="update-trigger"
      title="Edit Member"
      Trigger={
        <Button
          variant={"ghost"}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:shadow-2xl md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <Pencil1Icon />
          {"   "}
          Edit{"        "}
        </Button>
      }
      form={
        <EditForm isAdmin={isAdmin} admins={admins} fetchData={fetchData} />
      }
    />
  );
}
