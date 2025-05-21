"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";

interface ReportTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function ReportTable<TData, TValue>({ columns, data }: ReportTableProps<TData, TValue>) {
    const [inputValue, setInputValue] = useState("");
    const [globalFilter, setGlobalFilter] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    useEffect(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const formatted = yesterday.toISOString().split('T')[0];
        setStartDate(formatted);
        updateEndDate(formatted);
    }, []);

    const updateEndDate = (start: string) => {
        const startDt = new Date(start);
        startDt.setDate(startDt.getDate() + 1);
        const formattedEnd = startDt.toISOString().split('T')[0];
        setEndDate(formattedEnd);
    };
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setStartDate(selectedDate);
        updateEndDate(selectedDate);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setGlobalFilter(inputValue);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [inputValue]);
    const filteredData = useMemo(() => {
        let result = data;
        if (startDate && endDate) {
            const startDateTime = new Date(`${startDate}T08:00:00`);
            const endDateTime = new Date(`${endDate}T07:59:59`);
            result = result.filter((item: any) => {
                const updatedAt = new Date(item.updated_at);
                return updatedAt >= startDateTime && updatedAt <= endDateTime;
            });
        }
        if (globalFilter) {
            const searchTerm = globalFilter.toLowerCase();
            result = result.filter((row: any) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm)
                )
            );
        }

        return result;
    }, [data, globalFilter, startDate, endDate]);
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize },
        },
    });
    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        table.setPageSize(size);
    };
    const startItem = table.getState().pagination.pageIndex * pageSize + 1;
    const endItem = Math.min(startItem + pageSize - 1, filteredData.length);
    const totalItems = filteredData.length;
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");
        XLSX.writeFile(wb, "report.xlsx");
    };
    return (
        <div className="mx-4 my-2">
            <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6'>
                <div className='flex items-center gap-3'>
                    <label className='text-sm font-medium text-gray-700 whitespace-nowrap'>Start Date:</label>
                    <div className='flex items-center border rounded-md p-2'>
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className='border-none p-0 text-sm focus:ring-0 w-[100px]'
                        />
                        <span className='text-sm text-gray-500 ml-0'>8:00 AM</span>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <label className='text-sm font-medium text-gray-700 whitespace-nowrap'>End Date:</label>
                    <div className='flex items-center border rounded-md p-2 bg-gray-50'>
                        <input
                            type="date"
                            value={endDate}
                            disabled
                            className='border-none p-0 text-sm bg-transparent text-gray-500 w-[100px]'
                        />
                        <span className='text-sm text-gray-500 ml[-10px]'>7:59 AM</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4 items-center py-2">
                <Input
                    placeholder="Search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-[200px] text-sm"
                /><Button onClick={exportToExcel} className="text-sm bg-[var(--themeGreen)] text-white px-3 py-1 rounded">
                    Export to PDF
                </Button>
                <Button onClick={exportToExcel} className="text-sm bg-[var(--themeGreen)] text-white px-3 py-1 rounded">
                    Export to Excel
                </Button>
            </div>

            <div className="rounded-[5px] border max-h-[60vh] overflow-auto relative">
                <Table>
                    <TableHeader className="bg-[var(--themeBlue)] sticky top-0">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-xs text-white p-2">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-xs p-2">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-6">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between py-4 text-xs">
                <div className="relative">
                    <span className="mr-2">Items per page:</span>
                    <button
                        className="border px-2 py-1 rounded"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {pageSize} ▼
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-10 left-[60%] bg-white border shadow rounded mt-1 text-xs">
                            {[10, 25, 50].map((size) => (
                                <button
                                    key={size}
                                    className="block w-full px-4 py-2 hover:bg-gray-100 text-right"
                                    onClick={() => {
                                        handlePageSizeChange(size);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </Button>
                    <span>
                        {startItem} - {endItem} of {totalItems}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
