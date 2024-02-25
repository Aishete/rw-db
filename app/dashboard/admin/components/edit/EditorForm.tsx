import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicForm from "./BasicForm";
import AccountForm from "./AccountForm";
import AdvanceForm from "./AdvanceForm";
import { cn } from "@/lib/utils";
import { AdminPer } from "@/lib/type";

export default function EditForm({
  isAdmin,
  admins,
  fetchData,
}: {
  isAdmin?: boolean;
  admins: AdminPer;
  fetchData: () => void;
}) {
  return (
    <Tabs defaultValue="basic" className="w-full space-y-5">
      <TabsList
        className={cn("grid w-full ", isAdmin ? "grid-cols-3" : "grid-cols-1")}
      >
        <TabsTrigger value="basic">Basic</TabsTrigger>
        {isAdmin && (
          <>
            <TabsTrigger value="account">Acccount</TabsTrigger>
            <TabsTrigger value="advance">Advance</TabsTrigger>
          </>
        )}
      </TabsList>
      <TabsContent value="basic">
        <BasicForm admins={admins} fetchData={fetchData} />
      </TabsContent>
      {isAdmin && (
        <>
          <TabsContent value="account">
            <AccountForm admins={admins} fetchData={fetchData} />
          </TabsContent>
          <TabsContent value="advance">
            <AdvanceForm admins={admins} fetchData={fetchData} />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}
