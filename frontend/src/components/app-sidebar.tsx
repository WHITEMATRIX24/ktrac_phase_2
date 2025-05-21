"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  PieChart,
  WalletCards,
  FileText,
  BarChart2,
  Package,
  BarChart,
  TouchpadOff,
  LucideIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcherStatic } from "./team-switcher";
interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: { title: string; url: string }[];
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navItems, setNavItems] = React.useState<NavItem[]>([]);

  React.useEffect(() => {
    const role = localStorage.getItem("userRole");

    let navMain = [
      {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
        isActive: true,
        items: [
          { title: "Revenue", url: "/Dashboard/Revenue" },
          { title: "Bus Position", url: "/Dashboard/Bus_Position" },
          { title: "Unit wise bus allotment", url: "/Dashboard/Unit_Wise_Bus_Allotment" },
          { title: "Bus Allotment", url: "/Dashboard/Bus_Allotment" },
          { title: "Dockyard", url: "/Dashboard/Dockyard" },
        ],
      },
      {
        title: "Revenue",
        url: "#",
        icon: WalletCards,
        items: [
          { title: "Income", url: "#" },
          { title: "Expense", url: "#" },
          { title: "Balance Sheet", url: "#" },
          { title: "Purchase Order", url: "#" },
        ],
      },
      {
        title: "Schedule Management",
        url: "#",
        icon: Layers,
        items: [
          { title: "Add Schedule", url: "#" },
          { title: "Delete Schedule", url: "#" },
          { title: "Update Shedule", url: "#" },
        ],
      },
      {
        title: "Reports",
        url: "#",
        icon: PieChart,
        items: [
          { title: "Bus Position", url: "/Reports/Busposition" },
          { title: "Job Report", url: "#" },
          { title: "Driver Report", url: "#" },
        ],
      },
    ];

    if (role === "Finance") {
      navMain = [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutDashboard,
          isActive: true,
          items: [
            { title: "Financial Overview", url: "/Finance/Overview" },
            { title: "Pending Payments", url: "/Finance/PendingPayments" },
            { title: "Vendor Settlements", url: "/Finance/VendorSettlements" },
          ],
        },
        {
          title: "Transactions",
          url: "#",
          icon: WalletCards,
          items: [
            { title: "Income", url: "/Finance/Income" },
            { title: "Expenses", url: "/Finance/Expenses" },
            { title: "Balance Sheet", url: "/Finance/BalanceSheet" },
            { title: "Bank Reconciliation", url: "/Finance/BankReconciliation" },
          ],
        },
        {
          title: "Invoices",
          url: "#",
          icon: FileText,
          items: [
            { title: "Generate Invoice", url: "/Finance/GenerateInvoice" },
            { title: "Invoice History", url: "/Finance/InvoiceHistory" },
          ],
        },
        {
          title: "Reports",
          url: "#",
          icon: BarChart2,
          items: [
            { title: "Monthly Reports", url: "/Finance/MonthlyReports" },
            { title: "Audit Reports", url: "/Finance/AuditReports" },
          ],
        },
      ];
    } else if (role === "Maintenance") {
      navMain = [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutDashboard,
          isActive: true,
          items: [
            { title: "Workshop Overview", url: "/Mechanical/Overview" },
            { title: "Vehicle Status", url: "/Mechanical/VehicleStatus" },
            { title: "Spare Parts Inventory", url: "/Mechanical/Inventory" },
          ],
        },
        {
          title: "Maintenance",
          url: "#",
          icon: TouchpadOff,
          items: [
            { title: "Scheduled Maintenance", url: "/Mechanical/ScheduledMaintenance" },
            { title: "Breakdown Reports", url: "/Mechanical/BreakdownReports" },
            { title: "Maintenance History", url: "/Mechanical/MaintenanceHistory" },
          ],
        },
        {
          title: "Inventory",
          url: "#",
          icon: Package,
          items: [
            { title: "Spare Part Requests", url: "/Mechanical/PartRequests" },
            { title: "Stock In/Out", url: "/Mechanical/Stock" },
            { title: "Vendors", url: "/Mechanical/Vendors" },
          ],
        },
        {
          title: "Reports",
          url: "#",
          icon: BarChart,
          items: [
            { title: "Vehicle Health", url: "/Mechanical/VehicleHealthReport" },
            { title: "Parts Usage", url: "/Mechanical/PartsUsageReport" },
          ],
        },
      ];
    }

    setNavItems(navMain);
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcherStatic team={{ name: "KTRAC", logo: "/logo.png", plan: "Enroute Kerala" }} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <p className="text-center text-[10px] text-white">KTRAC v 2.0</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
