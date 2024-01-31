"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { province, district } from "./formProvince";
import onSubmit from "@/components/utils/action";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  candidatenameeng: z
    .string({
      required_error: "Candidate Name ENG is required",
    })
    .min(4, {
      message: "Candidate name in English must be at least 4 characters.",
    })
    .max(50),
  candidatenamekh: z
    .string({
      required_error: "Candidate Name KHM is required",
    })
    .min(4, {
      message: "Candidate name in Khmer must be at least 4 characters.",
    })
    .max(50),
  gender: z.string(),
  dateOfbirth: z.date(),
  phone: z.string({
    required_error: "Phone number is required",
    invalid_type_error: "You must fill in a Phone number",
  }),
  province: z.string({
    required_error: "District is required",
  }),
  district: z.string({
    required_error: "District is required",
  }),
  commune: z.string({
    required_error: "Commune is required",
  }),
  village: z.string(),
  CreateDate: z.date(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recuitercode: "",
      recuitername: "",
      referral: "",
      candidatenameeng: "",
      candidatenamekh: "",
      gender: "",
      dateOfbirth: new Date(1, 20, 2000), // month is 0-based, so 0 is January
      phone: "",
      province: "",
      district: "",
      commune: "",
      village: "",
      CreateDate: new Date(),
    },
  });

  interface SuccessToastProps {
    message: string;
  }

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const [stringDate, setStringDate] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleProvinceSelect = (provinceValue: string) => {
    setSelectedProvince(provinceValue);
  };
  const [open, setOpen] = React.useState(false);

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openCender, setOpenCender] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Perform form submission logic here

    // After submission is complete, reset the form and enable the button
    setIsSubmitting(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Candidate Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please fill in Candidate information{" "}
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
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <FormField
              control={form.control}
              name="candidatenameeng"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Candidate Name English</FormLabel>
                  <FormControl>
                    <Input placeholder="Name in English " {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="candidatenamekh"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Candidate Name Khmer</FormLabel>
                  <FormControl>
                    <Input placeholder="Name in Khmer" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:col-span-2">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfbirth"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:col-span-2">
                  <FormLabel>Date of birth</FormLabel>
                  <div className="relative w-[280px]">
                    <Popover open={openCender} onOpenChange={setOpenCender}>
                      <div className="relative w-[280px]">
                        <Input
                          placeholder="MM/DD/YYYY"
                          type="string"
                          value={stringDate}
                          aria-expanded={openCender}
                          onChange={(e) => {
                            setStringDate(e.target.value);
                            const parsedDate = new Date(e.target.value);
                            if (parsedDate.toString() === "Invalid Date") {
                              setErrorMessage("Invalid Date");
                              setDate(undefined);
                            } else {
                              setErrorMessage("");
                              setDate(parsedDate);
                              form.setValue("dateOfbirth", parsedDate);
                            }
                          }}
                        />
                        {errorMessage !== "" && (
                          <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
                            {errorMessage}
                          </div>
                        )}
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                      </div>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            if (!selectedDate) return;
                            setDate(selectedDate);
                            setStringDate(format(selectedDate, "MM/dd/yyyy"));
                            setErrorMessage("");
                            form.setValue("dateOfbirth", selectedDate);
                            setOpenCender(false);
                          }}
                          defaultMonth={date}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="province"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:col-span-2">
                  <FormLabel>Province</FormLabel>
                  <Popover open={openProvince} onOpenChange={setOpenProvince}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openProvince}
                          className="w-[200px] justify-between"
                        >
                          {field.value
                            ? province.find((p) => p.value === field.value)
                                ?.label
                            : "Select Province"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search provinces..." />
                        <CommandEmpty>No provinces found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72 w-48 rounded-md border">
                            {province.map((province) => (
                              <CommandItem
                                key={province.value}
                                value={province.label}
                                onSelect={() => {
                                  field.onChange(
                                    handleProvinceSelect(province.value)
                                  ),
                                    form.setValue("province", province.value),
                                    setOpenProvince(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    province.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {province.label}
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              name="district"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:col-span-2">
                  <FormLabel>District</FormLabel>
                  <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openDistrict}
                          className="w-[200px] justify-between"
                        >
                          {field.value && selectedProvince
                            ? district[selectedProvince]?.find(
                                (district) => district === field.value
                              )
                            : "Select District"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search districts..." />
                        <CommandEmpty>No districts found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72 w-48 rounded-md border">
                            {selectedProvince &&
                              district[selectedProvince]?.map(
                                (districtName) => (
                                  <CommandItem
                                    key={districtName}
                                    value={districtName}
                                    onSelect={() => {
                                      field.onChange(districtName),
                                        setOpenDistrict(false);
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        districtName === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      }`}
                                    />
                                    {districtName}
                                  </CommandItem>
                                )
                              )}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commune"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Commune</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter commune name" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="village"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Village</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter village name" {...field} />
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
