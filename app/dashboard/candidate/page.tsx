"use client";
import localForage from "localforage";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/recuriterTable/data-table";
import { readCandidate } from "./actions";
import { columns } from "./components/recuriterTable/columns";
import { CandidatePer } from "@/lib/type";

export default function Candidate() {
  const [data, setData] = useState<CandidatePer[]>([]);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  ); // Set initial offline status based on navigator.onLine

  const fetchCandidateDataFromCache = async () => {
    const cachedCandidateData: CandidatePer[] | null =
      await localForage.getItem("candidates");
    if (cachedCandidateData) {
      setData(cachedCandidateData);
      console.log("Using cached candidate data:", cachedCandidateData);
    }
  };

  const fetchCandidateDataFromDatabase = async () => {
    try {
      const { data: candidates } = await readCandidate();
      if (candidates) {
        const formattedCandidateData = candidates.map(
          (candidate: CandidatePer) => ({
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
          })
        );

        setData(formattedCandidateData);
        await localForage.setItem("candidates", formattedCandidateData);
      }
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      setIsOffline(true);
    }
  };

  const fetchCandidateData = async () => {
    if (isOffline) {
      await fetchCandidateDataFromCache();
    } else {
      await fetchCandidateDataFromDatabase();
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      fetchCandidateData(); // Fetch data when back online
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    fetchCandidateData(); // Initial data fetch

    const interval = setInterval(() => {
      if (!isOffline) {
        fetchCandidateData(); // Fetch data at regular intervals when online
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run the effect only once

  const columnsArray = columns(fetchCandidateData);

  console.log("Current isOffline status:", isOffline);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Candidate</h1>
      {isOffline && (
        <p>
          You are currently offline. Using cached data. Connect to the internet
          to fetch new data.
        </p>
      )}
      <DataTable
        columns={columnsArray}
        data={data}
        fetchData={fetchCandidateData}
      />
    </div>
  );
}
