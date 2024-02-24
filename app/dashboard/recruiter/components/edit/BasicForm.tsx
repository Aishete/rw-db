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
import { RecruiterPer } from "@/lib/type";
import { useTransition } from "react";
import { updateRecruiterBasicById } from "../../actions";

const FormSchema = z.object({
  recruiter_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  recruiter_code: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function BasicForm({
  admins,
  fatchData,
}: {
  admins: RecruiterPer;
  fatchData: () => void;
}) {
  const [ispedding, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recruiter_name: admins?.recruiter?.recruiter_name || "",
      recruiter_code: admins?.recruiter?.recruiter_code || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      try {
        const result = await updateRecruiterBasicById(admins?.recruiter_id, {
          recruiter_name: data.recruiter_name,
          recruiter_code: data.recruiter_code,
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
            toast({
              variant: "success",
              title: "Successfully Update Name!",
            });
            fatchData();
          }
          // Call fetchData regardless of whether an error occurred
        } else {
          // Handle the case where result is undefined
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
      }
      fatchData();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="recruiter_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recuiter Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recruiter_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recuiter Code</FormLabel>
              <FormControl>
                <Input placeholder="Code" {...field} />
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
            className={cn(" animate-spin", { hidden: !ispedding })}
          />
        </Button>
      </form>
    </Form>
  );
}
