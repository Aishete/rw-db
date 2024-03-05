"use client";

import localForage from "localforage";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { readAdmin } from "./actions";
import { columns, AdminPer } from "./components/columns";

export default function Admin() {
  const [data, setData] = useState<AdminPer[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine); // Set initial offline status based on navigator.onLine

  const fetchAdminData = async () => {
    try {
      const { data: admins } = await readAdmin();
      const formattedAdminData = (admins as AdminPer[]).map((admin) => ({
        id: admin.id,
        created_at: admin.created_at,
        role: admin.role,
        admin_id: admin.admin_id,
        Status: admin.Status,
        admin: {
          id: admin.admin.id,
          email: admin.admin.email,
          name: admin.admin.name,
          updated_at: admin.admin.updated_at,
        },
      }));
      setData(formattedAdminData);
      await localForage.setItem("admins", formattedAdminData);
      setIsOffline(false); // Set isOffline to false when online data is fetched successfully
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setIsOffline(true); // Set isOffline to true when offline or error occurs
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      fetchAdminData(); // Fetch data when back online
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    fetchAdminData(); // Initial data fetch

    const interval = setInterval(() => {
      if (!isOffline) {
        fetchAdminData(); // Fetch data at regular intervals when online
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run the effect only once

  const columnsArray = columns(fetchAdminData);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Admin</h1>
      {isOffline && (
        <p>
          You are currently offline. Using cached data. Connect to the internet
          to fetch new data.
        </p>
      )}
      <DataTable
        columns={columnsArray}
        data={data}
        fetchData={fetchAdminData}
      />
    </div>
  );
}
