"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { deleteAdminById } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

export default function DeleteForm({ user_id }: { user_id: string }) {
  const [ispedding, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = await deleteAdminById(user_id);
      if (result.error) {
        toast({
          title: "Delete fail!!",
          variant: "destructive",
          description: (Error as any).message,
        });
      } else {
        toast({
          title: "Delete success!!",
          variant: "success",
          description: "Admin has been deleted",
        });
      }
    });
  };

  return (
    <form action={onSubmit}>
      <Button variant="outline">
        <TrashIcon />
        Delete
        <AiOutlineLoading3Quarters
          className={cn("animate-spin", { hidden: !ispedding })}
        />
      </Button>
    </form>
  );
}
