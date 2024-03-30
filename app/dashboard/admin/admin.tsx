import React, { useState, useEffect } from "react";
import localForage from "localforage";
import { DataTable } from "./components/data-table";
import { readAdmin } from "./actions";
import { columns, AdminPer } from "./components/columns";

export default function useAdminData() {
  const [data, setData] = useState<AdminPer[]>([]);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  );

  const fetchAdminDataFromCache = async () => {
    const cachedAdminData: AdminPer[] | null = await localForage.getItem(
      "admins"
    );
    if (cachedAdminData) {
      setData(cachedAdminData);
    } else {
      setIsOffline(true);
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
      fetchAdminData();
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    fetchAdminData();

    const interval = setInterval(() => {
      if (!isOffline) {
        fetchAdminData();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  const columnsArray = columns(fetchAdminData);

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
        fetchData={fetchAdminData}
      />
    </>
  );
}
