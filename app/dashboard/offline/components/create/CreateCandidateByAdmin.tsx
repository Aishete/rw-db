"use client";
import { Button } from "@/components/ui/button";

import DailogForm from "../DialogForm";
import CreateForm from "./CreateForm";

export function CreateA({ fetchData }: { fetchData: () => void }) {
  return (
    <DailogForm
      id="create-trigger"
      title="Create Recruiter"
      Trigger={<Button variant="outline">Create+</Button>}
      form={<CreateForm fetchData={fetchData} />}
    />
  );
}
