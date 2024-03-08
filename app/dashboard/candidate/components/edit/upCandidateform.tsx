"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
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
import { province, district } from "../formProvince";
import { recruiter } from "@/lib/type";
import { readrecruiter } from "../../actions";
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
import {
  updateCandidateRecruiterByAdminId,
  updateCandidateRecruiterById,
} from "../../actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { CandidatePer } from "@/lib/type";

const FormSchema = z.object({
  referral: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  candidatenameeng: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  candidatenamekh: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  gender: z.enum(["Male", "Female"]),
  phone: z.string(),
  dateOfbirth: z.date(),
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
});

interface Candidateprom {
  Candidates: CandidatePer;
  fetchData: () => void;
}
export default function CreateForm({ Candidates, fetchData }: Candidateprom) {
  const [ispedding, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      referral: Candidates.referral,
      candidatenameeng: Candidates.candidatenameeng,
      candidatenamekh: Candidates.candidatenamekh,
      gender: Candidates.gender,
      dateOfbirth: new Date(Candidates.dateOfbirth), // month is 0-based, so 0 is January
      phone: Candidates.phone,
      province: Candidates.province,
      district: Candidates.district,
      commune: Candidates.commune,
      village: Candidates.village,
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      try {
        const dateOfBirthDate = new Date(data.dateOfbirth);
        if (dateOfBirthDate.toString() === "Invalid Date") {
          setErrorMessage("Invalid date of birth");
          return;
        }
        const updatedValues = {
          ...data,
          dateOfbirth: dateOfBirthDate,
        };
        const result = FormSchema.safeParse(updatedValues);
        if (!result.success) {
          // Handle validation errors
          console.error(result.error);
          return;
        }
        await updateCandidateRecruiterById(Candidates.id, updatedValues);
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
            title: "Successfully update Candidate!",
          });
          fetchData();
        }
      } catch (e) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: (e as Error).message,
        });
        fetchData();
      }
    });
  };

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const [stringDate, setStringDate] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleProvinceSelect = (provinceValue: string) => {
    setSelectedProvince(provinceValue);
  };

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openCender, setOpenCender] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="border-b border-gray-900/10 ">
          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral</FormLabel>
                <FormControl>
                  <Input placeholder="#" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border-b border-gray-900/10 pb-2">
          <div>
            <FormField
              control={form.control}
              name="candidatenameeng"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
                <FormItem>
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
                <FormItem>
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
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <div className="relative w-[280px]">
                    <Popover open={openCender} onOpenChange={setOpenCender}>
                      <div className="relative w-[280px]">
                        <Input
                          placeholder="MM/DD/YYYY"
                          {...field}
                          value={
                            stringDate || field.value
                              ? format(new Date(field.value), "MM/dd/yyyy")
                              : ""
                          }
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
              render={({ field }) => {
                // Open the district selection if a province is already selected
                if (field.value) {
                  setSelectedProvince(field.value);
                }

                return (
                  <FormItem className="w-full">
                    <FormLabel>Province</FormLabel>
                    <div>
                      <Popover
                        open={openProvince}
                        onOpenChange={setOpenProvince}
                      >
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
                                {province.map((provinceItem) => (
                                  <CommandItem
                                    key={provinceItem.value}
                                    value={provinceItem.label}
                                    onSelect={() => {
                                      field.onChange(
                                        handleProvinceSelect(provinceItem.value)
                                      );
                                      form.setValue(
                                        "province",
                                        provinceItem.value
                                      );
                                      setOpenProvince(false);
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        provinceItem.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      }`}
                                    />
                                    {provinceItem.label}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <div>
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
                                district[selectedProvince] &&
                                district[selectedProvince].map(
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
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commune"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
          <div className="mt-6 flex justify-end gap-4">
            <Button type="submit">
              Update
              <AiOutlineLoading3Quarters
                className={cn("animate-spin", { hidden: !ispedding })}
              />
            </Button>
          </div>
          <div className="mb-4"></div>
        </div>
      </form>
    </Form>
  );
}
export function UpdateCreateFormAdmin({
  Candidates,
  fetchData,
}: Candidateprom) {
  const [ispedding, startTransition] = useTransition();
  const [recruiters, setRecruiters] = useState<recruiter[]>([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const { data, error } = await readrecruiter();
        if (error) {
          console.error("Failed to fetch recruiters:", error.message);
        } else if (data) {
          setRecruiters(data); // Set state here
        }
      } catch (error) {
        console.error("Failed to fetch recruiters:", (error as Error)?.message);
      }
    };

    fetchRecruiters();
  }, []);
  const FormSchemaAdmin = z.object({
    referral: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    recruiterCID: z.string(),
    candidatenameeng: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    candidatenamekh: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    gender: z.enum(["Male", "Female"]),
    phone: z.string(),
    dateOfbirth: z.date(),
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
  });
  const form = useForm<z.infer<typeof FormSchemaAdmin>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      referral: Candidates.referral,
      candidatenameeng: Candidates.candidatenameeng,
      candidatenamekh: Candidates.candidatenamekh,
      gender: Candidates.gender,
      dateOfbirth: new Date(Candidates.dateOfbirth), // month is 0-based, so 0 is January
      phone: Candidates.phone,
      province: Candidates.province,
      district: Candidates.district,
      commune: Candidates.commune,
      village: Candidates.village,
      recruiterCID: Candidates.recruiterCID,
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchemaAdmin>) => {
    startTransition(async () => {
      const recruiterCID = form.getValues("recruiterCID");
      data = { ...data, recruiterCID };
      try {
        const dateOfBirthDate = new Date(data.dateOfbirth);
        if (dateOfBirthDate.toString() === "Invalid Date") {
          setErrorMessage("Invalid date of birth");
          return;
        }
        const updatedValues = {
          ...data,
          dateOfbirth: dateOfBirthDate,
          recruiterCID: data.recruiterCID,
        };

        const result = FormSchema.safeParse(updatedValues);
        if (!result.success) {
          // Handle validation errors
          console.error(result.error);
          return;
        }
        await updateCandidateRecruiterByAdminId(Candidates.id, updatedValues);
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
            title: "Successfully update Candidate!",
          });
          fetchData();
        }
      } catch (e) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: (e as Error).message,
        });
        fetchData();
      }
    });
  };

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const [stringDate, setStringDate] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleProvinceSelect = (provinceValue: string) => {
    setSelectedProvince(provinceValue);
  };

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openCender, setOpenCender] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 h-full"
      >
        <div className="border-b border-gray-900/10 ">
          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral</FormLabel>
                <FormControl>
                  <Input placeholder="#" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="recruiterCID"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Recruiter Name</FormLabel>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openProvince}
                        className="w-[200px] justify-between"
                      >
                        {field.value
                          ? recruiters.find((r) => r.id === field.value)
                              ?.recruiter_name
                          : "Select Recruiter"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search recruiters..." />
                      <CommandEmpty>No recruiters found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-72 w-48 rounded-md border">
                          {recruiters.map((recruiter) => (
                            <CommandItem
                              key={recruiter.id}
                              value={recruiter.recruiter_name}
                              onSelect={() => {
                                field.onChange(recruiter.id);
                                form.setValue("recruiterCID", recruiter.id);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  recruiter.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {recruiter.recruiter_name}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </FormItem>
          )}
        />
        <div className="border-b border-gray-900/10 pb-2">
          <div>
            <FormField
              control={form.control}
              name="candidatenameeng"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
                <FormItem>
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
                <FormItem>
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
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <div className="relative w-[280px]">
                    <Popover open={openCender} onOpenChange={setOpenCender}>
                      <div className="relative w-[280px]">
                        <Input
                          placeholder="MM/DD/YYYY"
                          {...field}
                          value={
                            stringDate || field.value
                              ? format(new Date(field.value), "MM/dd/yyyy")
                              : ""
                          }
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
              render={({ field }) => {
                // Open the district selection if a province is already selected
                if (field.value) {
                  setSelectedProvince(field.value);
                }

                return (
                  <FormItem className="w-full">
                    <FormLabel>Province</FormLabel>
                    <div>
                      <Popover
                        open={openProvince}
                        onOpenChange={setOpenProvince}
                      >
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
                                {province.map((provinceItem) => (
                                  <CommandItem
                                    key={provinceItem.value}
                                    value={provinceItem.label}
                                    onSelect={() => {
                                      field.onChange(
                                        handleProvinceSelect(provinceItem.value)
                                      );
                                      form.setValue(
                                        "province",
                                        provinceItem.value
                                      );
                                      setOpenProvince(false);
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        provinceItem.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      }`}
                                    />
                                    {provinceItem.label}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <div>
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
                                district[selectedProvince] &&
                                district[selectedProvince].map(
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
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commune"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
          <div className="mt-6 flex justify-end gap-4">
            <Button type="submit">
              Update
              <AiOutlineLoading3Quarters
                className={cn("animate-spin", { hidden: !ispedding })}
              />
            </Button>
          </div>
          <div className="mb-4"></div>
        </div>
      </form>
    </Form>
  );
}
