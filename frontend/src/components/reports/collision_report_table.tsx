"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import React, { Dispatch, SetStateAction } from "react";
import * as XLSX from "xlsx-js-style";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Ellipsis, EllipsisVertical } from "lucide-react";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  tableLabel: string;
  startDate: string;
  startDateSetter: Dispatch<SetStateAction<string>>;
  endDate: string;
  endDateSetter: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

type RowData = {
  [key: string]: string | number;
};

export function CollisionReportDataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  tableLabel,
  startDate,
  startDateSetter,
  endDate,
  endDateSetter,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });

  const exportToExcel = () => {
    const formattedData = data.map((row: any) => {
      const formattedRow: RowData = {};
      columns.forEach((col: any) => {
        const accessor = col.accessorKey || col.id;
        formattedRow[accessor] = row[accessor];
      });
      return formattedRow;
    });

    const ws_data = [
      ["KSRTC REPORT"],
      [tableLabel],
      [],
      columns.map((col) => col.header as string),
      ...formattedData.map((item) =>
        columns.map((col: any) => item[col.accessorKey || col.id])
      ),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);

    worksheet["A1"].s = {
      font: { bold: true, sz: 16 },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "FFFF00" } },
    };
    worksheet["A2"].s = {
      font: { italic: true, sz: 12 },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "FFCC99" } },
    };

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: columns.length - 1 } },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, `${tableLabel}.xlsx`);
  };

  // export pdf
  const exportPdfHandler = async () => {
    const doc = new jsPDF();
    const header: string[] = columns.map(
      (val: any) => val.accessorKey as string
    );
    // .splice(1);
    // console.log(`header: ${header}`);

    const pdfData: RowData[] = data.map((val) => val as RowData);
    const body = pdfData.map((row) => {
      return header.map((col) => {
        const smallLetterCols = col.toLowerCase();
        const value = row[smallLetterCols];
        if (value === undefined) {
          console.warn(`Missing value for column: ${col} in row:`, row);
          return "";
        }
        return value;
      });
    });
    // console.log(`data: ${body}`);

    doc.setFontSize(20);
    doc.text("KSRTC REPORT", 105, 10, { align: "center" });

    doc.setFontSize(14);
    doc.text(tableLabel, 13, 30, { align: "left" });

    autoTable(doc, {
      head: [header],
      body,
      startY: 40,
      margin: { horizontal: 13, vertical: 10 },
    });
    doc.save(tableLabel);
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-5">
          <div className="flex gap-1 items-center">
            <h6 className="font-medium text-[14px] text-grey-300">From </h6>
            <div className="flex items-center border rounded-md p-2 w-fit">
              <input
                type="date"
                value={startDate}
                onChange={(e) => startDateSetter(e.target.value)}
                className="border-none p-0 text-sm focus:ring-0 focus:outline-none w-32 h-full bg-gray-100"
              />
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <h6 className="font-medium">To </h6>
            <div className="flex items-center border rounded-md p-2 w-fit">
              <input
                type="date"
                value={endDate}
                onChange={(e) => endDateSetter(e.target.value)}
                className="border-none p-0 text-sm focus:ring-0 focus:outline-none w-32 h-full bg-gray-100"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search"
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-gray-100"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button className="cursor-pointer bg-transparent hover:bg-transparent shadow-none">
                <EllipsisVertical color="black" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 flex flex-col gap-3 mr-8">
              <button
                onClick={exportPdfHandler}
                className="bg-green-700 px-3 py-1 rounded-sm text-sm text-white cursor-pointer"
              >
                PDF Export
              </button>
              <button
                onClick={exportToExcel}
                className="bg-green-700 px-3 py-1 rounded-sm text-sm text-white cursor-pointer"
              >
                Excel Export
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="rounded-md border w-full overflow-auto h-[55vh]">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-[var(--sidebar-bg)] hover:bg-[var(--sidebar-bg)]"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-white">
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
            <TableBody className="h-full overflow-y-scroll">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center justify-start space-x-2 py-4">
          {table.getCanPreviousPage() && (
            <Button
              variant="outline"
              size="sm"
              className="border border-red-700 bg-white"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
          )}
          {table.getCanNextPage() && (
            <Button
              variant="outline"
              size="sm"
              className="border border-green-700 bg-white"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          )}
        </div>
      </div>
      
    </div>
  );
}
