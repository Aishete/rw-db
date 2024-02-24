"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import dynamic from "next/dynamic";
import SignOutform from "./SignOut";
import { toast } from "@/components/ui/use-toast";
import { logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { PowerIcon } from "@heroicons/react/24/outline";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

export function SignOut() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex h-[48px] w-full" asChild>
        <Button
          type="button" // Specify the type as "button" to prevent form submission
          variant="outline"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-600 hover:text-white hover:shadow-2xl md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be log out from RW Database!!!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <SignOutform />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
