"use client"

import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

// Sample data for vendor payments
const vendorPayments = [
    {
        invoiceId: "INV-00125",
        vendor: "Tata Motors",
        expenseType: "Spare Parts",
        amount: "₹1,20,000",
        status: "paid",
    },
    {
        invoiceId: "INV-00126",
        vendor: "Ashok Leyland",
        expenseType: "Maintenance Services",
        amount: "₹98,500",
        status: "pending",
    },
    {
        invoiceId: "INV-00127",
        vendor: "Volvo India",
        expenseType: "Engine Replacement",
        amount: "₹3,50,000",
        status: "overdue",
    },
    {
        invoiceId: "INV-00128",
        vendor: "Bharat Benz",
        expenseType: "Tyres",
        amount: "₹65,000",
        status: "paid",
    },
    {
        invoiceId: "INV-00129",
        vendor: "MICO Bosch",
        expenseType: "Electrical Components",
        amount: "₹72,300",
        status: "pending",
    },
]

// Helper to render status tag
function PaymentStatusTag({ status }: { status: "paid" | "pending" | "overdue" }) {
    switch (status) {
        case "paid":
            return (
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" /> Paid
                </span>
            )
        case "pending":
            return (
                <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                    <Clock className="w-4 h-4" /> Pending
                </span>
            )
        case "overdue":
            return (
                <span className="flex items-center gap-1 text-red-600 font-semibold">
                    <AlertCircle className="w-4 h-4" /> Overdue
                </span>
            )
        default:
            return <span>Unknown</span>
    }
}

export function VendorPaymentTable() {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Expense Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vendorPayments.map((payment) => (
                        <TableRow key={payment.invoiceId}>
                            <TableCell>{payment.invoiceId}</TableCell>
                            <TableCell>{payment.vendor}</TableCell>
                            <TableCell>{payment.expenseType}</TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>
                                <PaymentStatusTag status={payment.status as any} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
