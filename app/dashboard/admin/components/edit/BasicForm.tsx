"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { AdminPer } from "@/lib/type";
import { updateAdminBasicById } from "../../actions";
import { useTransition } from "react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});
export default function BasicForm({
  admins,
  fetchData,
}: {
  admins: AdminPer;
  fetchData: () => void;
}) {
  const [ispedding, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: admins[0]?.admin?.name || "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      try {
        const result = await updateAdminBasicById(admins[0]?.admin_id, {
          name: data.name,
        });

        if (result !== undefined) {
          const { error } = JSON.parse(JSON.stringify(result));
          if (error?.message) {
            toast({
              variant: "destructive",
              title: "Fail to Update Name!",
              description: <code className="text-white">{error.message}</code>,
            });
          } else {
            fetchData();
            toast({
              variant: "success",
              title: "Successfully Update Name!",
            });
          }
        } else {
          // Handle the case where result is undefined
          // For example, you might want to show a toast with an error message
          console.log(result);
          toast({
            variant: "destructive",
            title: "Error!",
            description: "An error occurred while updating the name.",
          });
        }
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Error!",
          description: (e as Error).message,
        });
        fetchData();
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex gap-2 items-center w-full"
          variant="outline"
        >
          Update{" "}
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !ispedding })}
          />
        </Button>
      </form>
    </Form>
  );
}
