import { Button } from "@/components/ui/button";
import DailogForm from "./DialogForm";
import TodoForm from "./TodoForm";

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

export default function CreateCandidatePH() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Create+</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create Candidate</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <TodoForm isEdit={false} />
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

export function CreateCandidateDT() {
  return (
    <DailogForm
      id="create-trigger"
      title="Create Todo"
      Trigger={<Button variant="outline">Create+</Button>}
      form={<TodoForm isEdit={false} />}
    />
  );
}
