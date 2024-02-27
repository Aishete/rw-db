"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CandidatePer } from "@/lib/type";
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

const ActionCell = ({
  row,
  fetchData,
}: {
  row: any;
  fetchData: () => void;
}) => {
  const CandidatePer = row.original;
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
        <EditRecruiter Candidates={CandidatePer} fetchData={fetchData} />
        <DeleteForm id={CandidatePer.id} fetchData={fetchData} />
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>View Recruiter details</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const columns = (fetchData: () => void): ColumnDef<CandidatePer>[] => [
  {
    id: "candidatenameeng",
    accessorKey: "candidatenameeng",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Candidate Name (Eng)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "candidatenamekh",
    accessorKey: "candidatenamekh",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Candidate Name (Kh)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "recrutedby",
    accessorKey: "recruiter.recruiter_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Recruted by
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "code",
    accessorKey: "recruiter.recruiter_code",
    header: () => <div className="text-left">Recruter Code</div>,
  },
  {
    id: "referral",
    accessorKey: "referral",
    header: () => <div className="text-left">Referral</div>,
  },
  {
    id: "gender",
    accessorKey: "gender",
    header: () => <div className="text-left">Gender</div>,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: () => <div className="text-left">Phone Number</div>,
  },
  {
    id: "province",
    accessorKey: "province",
    header: "Province",
  },
  {
    id: "district",
    accessorKey: "district",
    header: "District",
  },
  {
    id: "commune",
    accessorKey: "commune",
    header: "Commune",
  },
  {
    id: "village",
    accessorKey: "village",
    header: "Village",
  },

  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} fetchData={fetchData} />,
  },
];
