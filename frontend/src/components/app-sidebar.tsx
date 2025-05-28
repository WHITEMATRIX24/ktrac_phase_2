"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Layers,
  PieChart,
  WalletCards,
  FileText,
  BarChart2,
  Package,
  BarChart,
  LucideIcon,
  Wrench,
  User2,
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
const defaultNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      { title: "Revenue", url: "/Dashboard/Revenue" },
      { title: "Bus Position", url: "/Dashboard/Bus_Position" },
      // {
      //   title: "Unit wise bus allotment",
      //   url: "/Dashboard/Unit_Wise_Bus_Allotment",
      // },
      { title: "Bus Attendance", url: "/Dashboard/Bus_Attendance" },

      { title: "Bus Allotment", url: "/Dashboard/Bus_Allotment" },
      { title: "Dockyard", url: "/Dashboard/Dockyard" },
      {
        title: "Predictive Revenue",
        url: "/Dashboard/Predictive_Revenue",
      },
      {
        title: "Predictive Expense",
        url: "/Dashboard/Predictive_Expense",
      },
      {
        title: "Predictive Maintenance",
        url: "/Dashboard/Predictive_Maintenance",
      },
    ],
  },
  {
    title: "Revenue",
    url: "#",
    icon: WalletCards,
    items: [
      { title: "Income", url: "#" },
      { title: "Expense", url: "#" },
    ],
  },
  {
    title: "Schedule Management",
    url: "#",
    icon: Layers,
    items: [
      { title: "Add Schedule", url: "#" },
      { title: "Update Schedule", url: "#" },
    ],
  },
  {
    title: "Dock Management",
    url: "#",
    icon: Layers,
    items: [
      { title: "Report Dock", url: "/Dock_Management/Report_Dock" },
      { title: "Release Dock", url: "#" },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: PieChart,
    items: [
      { title: "Bus Position", url: "/Reports/Busposition" },
      { title: "Classwise Dock", url: "/Reports/Classwise_Dock" },
      { title: "Dock Busses", url: "/Reports/Dock_Busses" },
      {
        title: "Unitwise Bus Deployment",
        url: "/Reports/Unitwise_bus_deployment",
      },
      { title: "Enroute Buses", url: "/Reports/Enroute_buses" },
    ],
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navItems, setNavItems] = React.useState<NavItem[]>(defaultNavItems);
  React.useEffect(() => {
    const role = localStorage.getItem("userRole");
    let computedNavItems: NavItem[];

    if (role === "Finance") {
      computedNavItems = [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutDashboard,
          isActive: true,
          items: [
            { title: "Financial Overview", url: "#" },
            { title: "Pending Payments", url: "#" },
            { title: "Vendor Settlements", url: "#" },
          ],
        },
        {
          title: "Transactions",
          url: "#",
          icon: WalletCards,
          items: [
            { title: "Income", url: "#" },
            { title: "Expenses", url: "#" },
            { title: "Balance Sheet", url: "#" },
            { title: "Bank Reconciliation", url: "#" },
          ],
        },
        {
          title: "Invoices",
          url: "#",
          icon: FileText,
          items: [
            { title: "Generate Invoice", url: "#" },
            { title: "Invoice History", url: "#" },
          ],
        },
        {
          title: "Reports",
          url: "#",
          icon: BarChart2,
          items: [
            { title: "Monthly Reports", url: "#" },
            { title: "Audit Reports", url: "#" },
          ],
        },
      ];
    } else if (role === "Maintenance") {
      computedNavItems = [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutDashboard,
          isActive: true,
          items: [
            {
              title: "Maintenance Overview",
              url: "/Predictive_Maintenance_System/Overview",
            },
          ],
        },
        {
          title: "Maintenance",
          url: "#",
          icon: Wrench,
          items: [
            { title: "Scheduled Maintenance", url: "#" },
            { title: "Breakdown Reports", url: "#" },
            { title: "Maintenance History", url: "#" },
          ],
        },
        {
          title: "Inventory",
          url: "#",
          icon: Package,
          items: [
            { title: "Spare Part Requests", url: "#" },
            { title: "Stock In/Out", url: "#" },
            { title: "Vendors", url: "#" },
          ],
        },
        {
          title: "Reports",
          url: "#",
          icon: BarChart,
          items: [
            { title: "Vehicle Health", url: "#" },
            { title: "Parts Usage", url: "#" },
          ],
        },
      ];
    } else if (role === "Employee") {
      computedNavItems = [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutDashboard,
          items: [{ title: "Overview", url: "/Employee_Management/Overview" }],
        },
        {
          title: "Employee Management",
          url: "#",
          icon: User2,
          items: [
            {
              title: "All Employees",
              url: "/Employee_Management/All_Employees",
            },
            { title: "Add Employee", url: "/Employee_Management/Add_Employee" },
            { title: "Attendance", url: "/Employee_Management/Attendance" },
            {
              title: "Leave Requests",
              url: "/Employee_Management/Leave_Requests",
            },
            { title: "Payroll", url: "/Employee_Management/Payroll" },
          ],
        },
      ];
    } else {
      computedNavItems = defaultNavItems;
    }

    setNavItems(computedNavItems);
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcherStatic
          team={{ name: "KTRAC", logo: "/logo.png", plan: "Enroute Kerala" }}
        />
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
