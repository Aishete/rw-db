"use client";
import { logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useTransition } from "react";
import { PowerIcon } from "@heroicons/react/24/outline";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import dynamic from "next/dynamic";

export function SignOutform() {
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Button
        className="w-full flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 hover:text-white "
        variant="outline"
      >
        SignOut{" "}
        <AiOutlineLoading3Quarters
          className={cn(" animate-spin", { hidden: !isPending })}
        />
      </Button>
    </form>
  );
}
export default dynamic(() => Promise.resolve(SignOutform), { ssr: false });
