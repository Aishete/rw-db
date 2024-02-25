import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicForm from "./BasicForm";
import AccountForm from "./AccountForm";
import AdvanceForm from "./AdvanceForm";
import { cn } from "@/lib/utils";
import { RecruiterPer } from "@/lib/type";

export default function EditForm({
  admins,
  fetchData,
}: {
  admins: RecruiterPer;
  fetchData: () => void;
}) {
  return (
    <Tabs defaultValue="basic" className="w-full space-y-5">
      <TabsList className={cn("grid w-full ", "grid-cols-3")}>
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="account">Acccount</TabsTrigger>
        <TabsTrigger value="advance">Advance</TabsTrigger>
      </TabsList>
      <TabsContent value="basic">
        <BasicForm admins={admins} fetchData={fetchData} />
      </TabsContent>
      <TabsContent value="account">
        <AccountForm admins={admins} fetchData={fetchData} />
      </TabsContent>
      <TabsContent value="advance">
        <AdvanceForm admins={admins} fetchData={fetchData} />
      </TabsContent>
    </Tabs>
  );
}
