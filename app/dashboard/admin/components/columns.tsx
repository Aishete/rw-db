"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { role } from "../actions";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteForm from "./deleteform";
import EditAdmin from "./edit/EditAdmin";

const ActionCell = ({
  row,
  fetchData,
}: {
  row: any;
  fetchData: () => void;
}) => {
  const AdminPer = row.original;
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userIsAdmin = await role();
      setIsAdmin(userIsAdmin);
    };

    fetchUserRole();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <EditAdmin admins={[AdminPer]} fetchData={fetchData} />
        {isAdmin && (
          <DeleteForm user_id={AdminPer.admin_id} fetchData={fetchData} />
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Recruiter details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export type AdminPer = {
  id: string;
  created_at: string;
  role: "Super-Admin" | "Admin";
  admin_id: string;
  Status: "active" | "resigned";
  admin: {
    id: string;
    email: string;
    name: string;
    updated_at: string;
  };
};

export const columns = (fetchData: () => void): ColumnDef<AdminPer>[] => [
  {
    id: "Name",
    accessorKey: "admin.name",
    header: "Name",
  },
  {
    id: "Role",
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "Email",
    accessorKey: "admin.email",
    header: "Email",
  },
  {
    id: "Status",
    accessorKey: "Status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} fetchData={fetchData} />,
  },
];
