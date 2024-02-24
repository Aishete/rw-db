"use client";
import { Button } from "@/components/ui/button";

import DailogForm from "../DialogForm";
import CreateForm from "./CreateForm";

// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

export function CreateA() {
  return (
    <DailogForm
      id="create-trigger"
      title="Create Recruiter"
      Trigger={<Button variant="outline">Create+</Button>}
      form={<CreateForm />}
    />
  );
}

// export function CreateAdminPH() {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   return (
//     <Drawer open={isOpen} onClose={handleClose}>
//       <DrawerTrigger asChild>
//         <Button variant="outline" onClick={handleOpen}>
//           Create+
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <div className="mx-auto w-full max-w-sm">
//           <DrawerHeader>
//             <DrawerTitle>Create Recruiter</DrawerTitle>
//             <DrawerDescription></DrawerDescription>
//           </DrawerHeader>
//           <CreateForm onSuccess={handleClose} />
//           <DrawerFooter className="w-full space-y-6">
//             <DrawerClose className="w-full space-y-6">
//               <Button className="w-full bg-white " variant="outline">
//                 Cancel
//               </Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }
