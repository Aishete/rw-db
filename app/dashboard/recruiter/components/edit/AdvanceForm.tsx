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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { RecruiterPer } from "@/lib/type";
import { useTransition } from "react";
import { updateRecruiterAdvanceById } from "../../actions";

const FormSchema = z.object({
  role: z.enum(["Recruiter"]),
  Status: z.enum(["active", "resigned"]),
});

export default function AdvanceForm({
  admins,
  fatchData,
}: {
  admins: RecruiterPer;
  fatchData: () => void;
}) {
  const [ispedding, startTransition] = useTransition();
  const roles = ["Recruiter"];
  const status = ["active", "resigned"];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: admins?.role,
      Status: admins?.Status,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    try {
      startTransition(async () => {
        const result = await updateRecruiterAdvanceById(
          admins?.id,
          admins?.recruiter?.id,
          data
        );

        if (result) {
          const { error } = JSON.parse(JSON.stringify(result));

          if (error?.message) {
            toast({
              variant: "destructive",
              title: "Fail to Update Advance!",
              description: <code className="text-white">{error.message}</code>,
            });
          } else {
            toast({
              variant: "success",
              title: "Successfully Update Advance!",
            });
            fatchData();
          }
        } else {
          // Handle the case where result is null or undefined
          // For example, you might want to show a toast with an error message
          toast({
            variant: "destructive",
            title: "Error!",
            description: "An error occurred while updating the advance.",
          });
        }
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: (e as Error).message,
      });
    }
    fatchData();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role, index) => {
                    return (
                      <SelectItem value={role} key={index}>
                        {role}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {status.map((status, index) => {
                    return (
                      <SelectItem value={status} key={index}>
                        {status}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                status resign mean the user is no longer work here.
              </FormDescription>

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
            className={cn(" animate-spin", { hidden: !ispedding })}
          />
        </Button>
      </form>
    </Form>
  );
}
