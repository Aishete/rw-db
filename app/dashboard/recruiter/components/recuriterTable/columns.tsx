"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteForm from "../deleteForm";
import EditRecruiter from "../edit/EditRecruiter";

export type RecruiterPer = {
  id: string;
  created_at: string;
  role: "Recruiter";
  Status: "active" | "resigned";
  recruiter_id: string;
  recruiter: {
    id: string;
    email: string;
    created_at: string;
    recruiter_code: string;
    recruiter_name: string;
  };
};
const ActionCell = ({
  row,
  fetchData,
}: {
  row: any;
  fetchData: () => void;
}) => {
  const RecruiterPer = row.original;
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
        <EditRecruiter admins={RecruiterPer} fetchData={fetchData} />
        <DeleteForm user_id={RecruiterPer.recruiter_id} fetchData={fetchData} />
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>View Recruiter details</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const columns = (fetchData: () => void): ColumnDef<RecruiterPer>[] => [
  {
    id: "Name",
    accessorKey: "recruiter.recruiter_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "Code",
    accessorKey: "recruiter.recruiter_code",
    header: () => <div className="text-left">Code</div>,
  },
  {
    id: "Role",
    accessorKey: "role",
    header: () => <div className="text-left">Role</div>,
  },

  {
    id: "Email",
    accessorKey: "recruiter.email",
    header: "Email",
  },
  {
    accessorKey: "Status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} fetchData={fetchData} />,
  },
];
