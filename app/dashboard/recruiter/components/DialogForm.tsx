import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import React, { ReactNode } from "react";

export default function DailogForm({
  Trigger,
  id,
  title,
  form,
}: {
  title: string;
  Trigger: ReactNode;
  id: string;
  form: ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild id={id}>
        {Trigger}
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-[900px]   w-[350px] ">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when
            </SheetDescription>
            {form}
          </SheetHeader>
        </ScrollArea>
      </SheetContent>
    </Sheet>
    // <Dialog>
    //   <DialogTrigger asChild id={id}>
    //     {Trigger}
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[525px] dark:bg-graident-dark">
    //     <DialogHeader>
    //       <DialogTitle>{title}</DialogTitle>
    //       <DialogDescription>
    //         Make changes to your profile here. Click save when
    //       </DialogDescription>
    //     </DialogHeader>
    //     {form}
    //   </DialogContent>
    // </Dialog>
  );
}
