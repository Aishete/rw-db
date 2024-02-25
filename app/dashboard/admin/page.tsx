"use client";

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

  const fetchData = async () => {
    const result = await fetchAdmin();
    setData(result);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columnsArray = columns(fetchData);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Admin</h1>

      <DataTable columns={columnsArray} data={data} fetchData={fetchData} />
    </div>
  );
}
