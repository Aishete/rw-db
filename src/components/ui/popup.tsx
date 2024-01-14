"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/app/router/signin/page";
import { PowerIcon } from "@heroicons/react/24/outline";

export function LogUsers() {
  return (
    <Button
      type="submit"
      variant="outline"
      onClick={() =>
        toast("🌟Welcome to🌟", {
          description: "You have login to 🌟RW-Database🌟  ",
        })
      }
    >
      Login
    </Button>
  );
}
export function LogoutUsers() {
  const handleSignOut = async () => {
    const { success, error } = await signOutUser();

    if (success) {
      console.log("User signed out successfully");
    } else {
      console.error("Error signing out:", error);
    }
  };
  return (
    <Button
      type="submit"
      variant="outline"
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-black hover:text-white hover:shadow-2xl md:flex-none md:justify-start md:p-2 md:px-3"
      onClick={() => {
        toast("🥺 See You", {
          description: "You have Logout ( •̯́ ₃ •̯̀)  ",
        });
        handleSignOut();
      }}
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </Button>
  );
}

export function submitform() {
  const handleSignOut = async () => {
    const { success, error } = await signOutUser();

    if (success) {
      console.log("User signed out successfully");
    } else {
      console.error("Error signing out:", error);
    }
  };
  return (
    <Button
      type="submit"
      variant="outline"
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-black hover:text-white hover:shadow-2xl md:flex-none md:justify-start md:p-2 md:px-3"
      onClick={() => {
        toast(<strong>Submited</strong>, {
          description: "Your form",
        });
        handleSignOut();
      }}
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </Button>
  );
}
