import { SectionCards } from "@/components/section-cards";
import { User, UserCheck, UserLock, UserPen } from "lucide-react";

// New imports for surrender duty-related charts
import { SurrenderDutyTrendChart } from "@/components/employee/SurrenderDutyTrendChart";
import { MonthlySurrenderSummaryChart } from "@/components/employee/MonthlySurrenderSummaryChart";
import { KsrtcStaffBarChart } from "@/components/employee/KsrtcStaffBarChart";

export default function Page() {
  const StaffData = [
    {
      title: "Total Staff",
      value: 12945,
      change: "0",
      icon: <User className="w-12 h-12 text-grey opacity-40" />,
    },
    {
      title: "On Duty",
      value: 9458,
      change: "0",
      icon: <UserCheck className="w-12 h-12 text-grey opacity-40" />,
    },
    {
      title: "On Leave",
      value: 3487,
      change: "0",
      icon: <UserLock className="w-12 h-12 text-grey opacity-40" />,
    },
    {
      title: "Temporary Staff",
      value: 3458,
      change: "0",
      icon: <UserPen className="w-12 h-12 text-grey opacity-40" />,
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={StaffData} />

          {/* Employee Surrender Duty charts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="pl-4 lg:pl-6">
              <SurrenderDutyTrendChart />
            </div>

            <div className="pl-4 lg:pl-6">
              <KsrtcStaffBarChart />
              {/* <MonthlySurrenderSummaryChart /> */}
            </div>
          </div>

          {/* Vendor Payment Section */}
          {/* <div className="grid grid-cols-1 gap-4 mx-4">
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
                    </div> */}
        </div>
      </div>
    </div>
  );
}
