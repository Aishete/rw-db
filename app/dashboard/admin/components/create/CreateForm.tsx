"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAdmin, updateAdminById } from "../../actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { use, useState, useTransition } from "react";
import { useRefreshStore } from "@/lib/store/user";
const FormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    role: z.enum(["Admin", "Super-Admin"]),
    status: z.enum(["active", "resigned"]),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password should be 6 characters" }),
    confirm: z.string().min(6, { message: "Password should be 6 characters" }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passowrd doesn't match",
    path: ["confirm"],
  });
interface AdminFormProps {
  onSuccess?: () => void;
}
export default function AdminForm({ onSuccess }: AdminFormProps) {
  const [ispedding, startTransition] = useTransition();
  const roles = ["Super-Admin", "Admin"];
  const status = ["active", "resigned"];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      role: "Admin",
      status: "active",
      email: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      try {
        const result = await createAdmin(data);
        const { error } = JSON.parse(JSON.stringify(result));
        if (error?.message) {
          toast({
            variant: "destructive",
            title: "Fail to login",
            description: <code className="text-white">{error.message}</code>,
          });
        } else {
          document.getElementById("create-trigger")?.click();
          toast({
            variant: "success",
            title: "Successfully created user!",
          });
          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (e) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: (e as Error).message,
        });
      }
    });
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="display name" onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="status"
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
          className="w-11/12 ml-4 flex gap-2 items-center"
          variant="outline"
        >
          Submit{" "}
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !ispedding })}
          />
        </Button>
      </form>
    </Form>
  );
}
