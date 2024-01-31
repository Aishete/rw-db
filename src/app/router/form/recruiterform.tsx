"use client";
import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { onSubmitR } from "@/components/utils/action";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  referral: z
    .string({
      required_error: "Referral is required",
    })
    .min(4, {
      message: "Referral must be at least 4 characters.",
    })
    .max(50),
  recuitercode: z
    .string()
    .min(4, {
      message: "Recruiter Code must be at least 4 characters.",
    })
    .max(50),
  recuitername: z
    .string({
      required_error: "Recuiter Name is required",
    })
    .min(4, {
      message: "Recruiter name must be at least 4 characters.",
    })
    .max(50),
  CreateDate: z.date(),
});

export function ProfileFormR() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recuitercode: "",
      recuitername: "",
      referral: "",
      CreateDate: new Date(),
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitR)} className="space-y-8">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Recuiter Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please fill in Recuiter information and use it in candidate{" "}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <FormField
              control={form.control}
              name="referral"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Referral</FormLabel>
                  <FormControl>
                    <Input placeholder="#" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recuitercode"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Recurter Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Recurter Code" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recuitername"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Recuiter Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a Name" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/home/candidate"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
