
import { SectionCards } from "@/components/section-cards";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Clock, UserCheck, Wallet } from "lucide-react";
import { VendorPaymentTable } from "@/components/finance/vendorPayementTable";
import { BudgetComparisonChart } from "@/components/finance/budgetComparisonChart";
import { RevenueExpenseChart } from "@/components/finance/revenueChart";
import { TicketingTrendChart } from "@/components/finance/ticketingTrends";

export default function Page() {
    const financeData = [
        {
            title: "Monthly Revenue",
            value: 1294500,
            change:'+2.2%',
            icon: <Wallet className="w-15 h-15 text-grey opacity-70" />,
        },
        {
            title: "Total Expenses",
            value: 9458000,
            change:'+1.2%',
            icon: <Banknote className="w-12 h-12 text-grey opacity-70" />,
        },
        {
            title: "Vendor Payments Pending",
            value: 2148000,
            change:'0',
            icon: <Clock className="w-12 h-12 text-grey opacity-70" />,
        },
        {
            title: "Salary Disbursed",
            value: 3458000,
            change:'0',
            icon: <UserCheck className="w-12 h-12 text-grey opacity-70" />,
        },
    ];

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards data={financeData} />


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-6">
                        <TicketingTrendChart />
                        <BudgetComparisonChart />
                        <RevenueExpenseChart />
                    </div>
                    <div className="grid grid-cols-1 gap-4 mx-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Vendor Payment Status</CardTitle>
                                <CardDescription>
                                    Pending and completed vendor transactions
                                </CardDescription>
                            </CardHeader>
                            <div className="px-4 lg:pl-6">
                                <VendorPaymentTable />
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
