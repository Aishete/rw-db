"use client";

import SearchMembers from "./components/SearchMembers";
import { DataTable } from "./components/recuriterTable/data-table";
import { columns, RecruiterPer } from "./components/recuriterTable/columns";
import { readRecruiter } from "./actions";
import React, { useState, useEffect } from "react";
async function fetchRecruiter(): Promise<RecruiterPer[]> {
  const { data: recruiters } = await readRecruiter();
  return (recruiters as RecruiterPer[]).map((recruiter) => ({
    id: recruiter.id,
    created_at: recruiter.created_at,
    role: "Recruiter",
    Status: recruiter.Status,
    recruiter_id: recruiter.recruiter_id,
    recruiter: {
      id: recruiter.recruiter.id,
      email: recruiter.recruiter.email,
      created_at: recruiter.recruiter.created_at,
      recruiter_code: recruiter.recruiter.recruiter_code,
      recruiter_name: recruiter.recruiter.recruiter_name,
    },
  }));
}

export default function Recruiter() {
  const [data, setData] = useState<RecruiterPer[]>([]);

  const fetchData = async () => {
    const result = await fetchRecruiter();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columnsArray = columns(fetchData);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Recruiter</h1>
      <DataTable columns={columnsArray} data={data} fetchData={fetchData} />
    </div>
  );
}
