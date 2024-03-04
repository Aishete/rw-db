"use client";
import localForage from "localforage";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { readAdmin } from "./actions";
import { columns, AdminPer } from "./components/columns";

async function fetchAdmin(): Promise<AdminPer[]> {
  const { data: admins } = await readAdmin();
  return (admins as AdminPer[]).map((admin) => ({
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
}
export default function Admin() {
  const [data, setData] = useState<AdminPer[]>([]);
  const [isOffline, setIsOffline] = useState(false);

  const fetchCachedData = async () => {
    const cachedData = await localForage.getItem<AdminPer[]>("admins");
    if (cachedData) {
      setData(cachedData);
    } else {
      setIsOffline(true);
    }
  };

  const fetchFromDatabase = async () => {
    const result = await fetchAdmin();
    setData(result);
    await localForage.setItem("admins", result);
    setIsOffline(false);
  };

  useEffect(() => {
    fetchCachedData();
    fetchFromDatabase();

    const interval = setInterval(() => {
      if (!isOffline) {
        fetchFromDatabase();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isOffline]);

  const columnsArray = columns(fetchFromDatabase);

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
        fetchData={fetchFromDatabase}
      />
    </div>
  );
}
