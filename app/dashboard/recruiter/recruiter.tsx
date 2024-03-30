import React, { useState, useEffect } from "react";
import localForage from "localforage";
import { DataTable } from "./components/recuriterTable/data-table";
import { columns, RecruiterPer } from "./components/recuriterTable/columns";
import { readRecruiter } from "./actions";
export default function Recruiter() {
  const [data, setData] = useState<RecruiterPer[]>([]);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  );

  const fetchRecruiterDataFromCache = async () => {
    const cachedRecruiterData: RecruiterPer[] | null =
      await localForage.getItem("recruiters");
    if (cachedRecruiterData) {
      setData(cachedRecruiterData);
    } else {
      setIsOffline(true);
    }
  };

  const fetchRecruiterDataFromDatabase = async () => {
    try {
      const { data: recruiters } = await readRecruiter();
      if (recruiters) {
        const formattedRecruiterData = recruiters.map(
          (recruiter: RecruiterPer) => ({
            id: recruiter.id,
            created_at: recruiter.created_at,
            role: recruiter.role,
            Status: recruiter.Status,
            recruiter_id: recruiter.recruiter_id,
            recruiter: {
              id: recruiter.recruiter.id,
              email: recruiter.recruiter.email,
              created_at: recruiter.recruiter.created_at,
              recruiter_code: recruiter.recruiter.recruiter_code,
              recruiter_name: recruiter.recruiter.recruiter_name,
            },
          })
        );

        setData(formattedRecruiterData);
        await localForage.setItem("recruiters", formattedRecruiterData);
        setIsOffline(false);
      }
    } catch (error) {
      console.error("Error fetching recruiter data:", error);
      setIsOffline(true);
    }
  };

  const fetchRecruiterData = async () => {
    if (isOffline) {
      await fetchRecruiterDataFromCache();
    } else {
      await fetchRecruiterDataFromDatabase();
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      fetchRecruiterData(); // Fetch data when back online
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    fetchRecruiterData(); // Initial data fetch

    const interval = setInterval(() => {
      if (!isOffline) {
        fetchRecruiterData(); // Fetch data at regular intervals when online
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run the effect only once

  const columnsArray = columns(fetchRecruiterData);

  return (
    <>
      {isOffline && (
        <p>
          You are currently offline. Using cached data. Connect to the internet
          to fetch new data.
        </p>
      )}
      <DataTable
        columns={columnsArray}
        data={data}
        fetchData={fetchRecruiterData}
      />
    </>
  );
}
