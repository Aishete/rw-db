import * as React from "react"; // Import React
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { CreateA, CreateR } from "../create/CreateCandidate";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "@/components/pagination";
import { role } from "../../actions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetchData: () => void;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  fetchData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userIsAdmin = await role();
      setIsAdmin(userIsAdmin);
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    Promise.resolve(fetchData())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center py-4">
        {!isAdmin && (
          <Input
            placeholder="Filter Recruter..."
            value={
              (table.getColumn("recrutedby")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("recrutedby")?.setFilterValue(event.target.value)
            }
            className="bg-white max-w-sm"
          />
        )}
        {isAdmin && (
          <Input
            placeholder="Filter candidate name in english..."
            value={
              (table
                .getColumn("candidatenameeng")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("candidatenameeng")
                ?.setFilterValue(event.target.value)
            }
            className="bg-white max-w-sm"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="bg-white rounded-md border ml-2">
          {isAdmin && <CreateA fetchData={fetchData} />}
          {!isAdmin && <CreateR fetchData={fetchData} />}
        </div>
      </div>
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? (
                    <div className="flex justify-center">
                      <AiOutlineLoading3Quarters
                        className={cn("animate-spin h-6 w-6 text-gray-500")}
                      />
                    </div>
                  ) : data.length ? null : (
                    "No data"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
