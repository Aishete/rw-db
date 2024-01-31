"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PowerIcon } from "@heroicons/react/24/outline";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();
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
export async function signOutUser() {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
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
    <AlertDialog>
      <AlertDialogTrigger className="flex h-[48px] w-full">
        <Button
          type="button" // Specify the type as "button" to prevent form submission
          variant="outline"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-black hover:text-white hover:shadow-2xl md:flex-none md:justify-start md:p-2 md:px-3"
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
          <AlertDialogAction
            className="hover:bg-red-500 "
            onClick={() => {
              toast("🥺 See You", {
                description: "You have Logout ( •̯́ ₃ •̯̀)  ",
              });
              handleSignOut();
            }}
          >
            Log Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
