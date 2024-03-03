"use client";

import { DataTable } from "./components/recuriterTable/data-table";
import { columns } from "./components/recuriterTable/columns";
import { CandidatePer } from "@/lib/type";
import { readCandidate } from "./actions";
import React, { useState, useEffect } from "react";
async function fetchCandidate(): Promise<CandidatePer[]> {
  const { data: candidates } = await readCandidate();
  return (candidates as CandidatePer[]).map((candidate) => ({
    id: candidate.id,
    created_at: candidate.created_at,
    referral: candidate.referral,
    recruiterCID: candidate.recruiterCID,
    candidatenameeng: candidate.candidatenameeng,
    candidatenamekh: candidate.candidatenamekh,
    phone: candidate.phone,
    dateOfbirth: candidate.dateOfbirth,
    gender: candidate.gender,
    province: candidate.province,
    district: candidate.district,
    commune: candidate.commune,
    village: candidate.village,
    recruiter: {
      id: candidate.recruiter.id,
      email: candidate.recruiter.email,
      created_at: candidate.recruiter.created_at,
      recruiter_code: candidate.recruiter.recruiter_code,
      recruiter_name: candidate.recruiter.recruiter_name,
    },
  }));
}

export default function Candidates() {
  const [data, setData] = useState<CandidatePer[]>([]);

  const fetchData = async () => {
    const result = await fetchCandidate();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columnsArray = columns(fetchData);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Candidate</h1>
      <DataTable columns={columnsArray} data={data} fetchData={fetchData} />
    </div>
  );
}
