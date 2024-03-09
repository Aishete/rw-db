"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { deleteCandidateById } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
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
export default function DeleteForm({
  id,
  fetchData,
}: {
  id: string;
  fetchData: () => void;
}) {
  const [ispedding, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = await deleteCandidateById(id);
      if (result.error) {
        toast({
          title: "Delete fail!!",
          variant: "destructive",
          description: <code className="text-white">{result.error}</code>,
        });
      } else {
        fetchData();
        toast({
          title: "Delete success!!",
          variant: "success",
          description: "Candidate has been deleted",
        });
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex h-[48px] w-full" asChild>
        <Button
          type="button" // Specify the type as "button" to prevent form submission
          variant="ghost"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-600 hover:text-white hover:shadow-2xl md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <TrashIcon />
          <div>Delete</div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will this recuiter from RW Database!!!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-inherit  hover:bg-inherit shadow-white">
            <form action={onSubmit}>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 hover:text-white "
              >
                <TrashIcon />

                <div>Delete</div>
                {"   "}
                <AiOutlineLoading3Quarters
                  className={cn("animate-spin", { hidden: !ispedding })}
                />
              </Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
