"use client";

import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  InvoiceSkeleton,
  CardSkeleton,
} from "@/components/ui/skeletons";

import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  return (
    <main>
      <h1
        className={`mb-4 text-xl md:text-2xl flex h-15 items-end justify-start rounded-md bg-black shadow-2xl p-4 md:h-15 text-white`}
      >
        Dashboard
      </h1>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<InvoiceSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
    </main>
  );
};
export default Page;
