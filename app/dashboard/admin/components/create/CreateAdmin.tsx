"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import DailogForm from "../DialogForm";
import CreateForm from "./CreateForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
export function CreateA() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowWidth < 768 ? <CreateAdminPH /> : <CreateAdmin />;
}

export function CreateAdmin() {
  return (
    <DailogForm
      id="create-trigger"
      title="Create Admin"
      Trigger={<Button variant="outline">Create+</Button>}
      form={<CreateForm />}
    />
  );
}

export function CreateAdminPH() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={handleOpen}>
          Create+
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create Admin</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <CreateForm onSuccess={handleClose} />
          <DrawerFooter className="w-full space-y-6">
            <DrawerClose className="w-full space-y-6">
              <Button className="w-full " variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
