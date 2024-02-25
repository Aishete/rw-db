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
import { useTransition } from "react";
import { updateAdminAccountById } from "../../actions";
const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().optional(),
    confirm: z.string().optional(),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passowrd doesn't match",
    path: ["confirm"],
  });

export default function AccountForm({
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
      email: admins[0]?.admin?.email || "",
      password: "",
      confirm: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      startTransition(async () => {
        const result = await updateAdminAccountById(admins[0].admin.id, data);

        if (result) {
          const { error } = JSON.parse(JSON.stringify(result));

          if (error?.message) {
            toast({
              variant: "destructive",
              title: "Fail to Update Account!",
              description: <code className="text-white">{error.message}</code>,
            });
          } else {
            fetchData();
            toast({
              variant: "success",
              title: "Successfully Update Account!",
            });
          }
        } else {
          // Handle the case where result is null or undefined
          // For example, you might want to show a toast with an error message
          toast({
            variant: "destructive",
            title: "Error!",
            description: "An error occurred while updating the account.",
          });
        }
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: (e as Error).message,
      });
      fetchData();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@gmail.com"
                  type="email"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  type="password"
                  onChange={field.onChange}
                />
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
          Update
          <AiOutlineLoading3Quarters
            className={cn(" animate-spin", { hidden: !ispedding })}
          />
        </Button>
      </form>
    </Form>
  );
}
