import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideBar } from "./SideNav";
import { useEffect } from "react";

export default function MobileSideNav() {
  return (
    <Sheet>
      <SheetTrigger asChild id="toggle-sidebar">
        <span></span>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-1/2 dark:bg-graident-dark flex">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
}
