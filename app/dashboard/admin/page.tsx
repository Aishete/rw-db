"use client";
import localForage from "localforage";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { readAdmin } from "./actions";
import { columns, AdminPer } from "./components/columns";

export default function Admin() {
  const [data, setData] = useState<AdminPer[]>([]);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  ); // Set initial offline status based on navigator.onLine

  const fetchAdminDataFromCache = async () => {
    const cachedAdminData: AdminPer[] | null = await localForage.getItem(
      "admins"
    );
    if (cachedAdminData) {
      setData(cachedAdminData);
      console.log("Using cached admin data:", cachedAdminData);
    }
  };

  const fetchAdminDataFromDatabase = async () => {
    try {
      const { data: admins } = await readAdmin();
      if (admins) {
        const formattedAdminData = admins.map((admin: AdminPer) => ({
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
        console.log("Admin data fetched successfully:", formattedAdminData);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setIsOffline(true);
    }
  };

  const fetchAdminData = async () => {
    if (isOffline) {
      await fetchAdminDataFromCache();
    } else {
      await fetchAdminDataFromDatabase();
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

  console.log("Current isOffline status:", isOffline);

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
