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
  Bus,
  UserCircle,
  AlertTriangle,
  ClipboardList,
  FileWarning,
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

interface NavSubItem {
  title: string;
  url: string;
  disabled?: boolean;
}

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavSubItem[];
}

// Utility to mark subitems with url "#" as disabled
function markDisabledUrls(items: NavItem[]): NavItem[] {
  return items.map((item) => ({
    ...item,
    items: item.items?.map((subItem) => ({
      ...subItem,
      disabled: subItem.url === "#",
    })),
  }));
}
const defaultNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      { title: "Accidents", url: "/Dashboard/Accidents" },
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
      // { title: "Bus Position", url: "/Reports/Busposition" },
      // { title: "Classwise Dock", url: "/Reports/Classwise_Dock" },
      // { title: "Dock Busses", url: "/Reports/Dock_Busses" },
      // {
      //   title: "Unitwise Bus Deployment",
      //   url: "/Reports/Unitwise_bus_deployment",
      // },
      // { title: "Enroute Buses", url: "/Reports/Enroute_buses" },
      { title: "Accident Month Wise", url: "/Reports/Accidents/Month_Wise" },
      { title: "Accident Bus Type", url: "/Reports/Accidents/Bus_Type_Wise" },
      {
        title: "Accident Collision Type",
        url: "/Reports/Accidents/Collision_Type",
      },
      {
        title: "Accident District Wise",
        url: "/Reports/Accidents/District_Wise",
      },
      {
        title: "Accident Involved Vehicle",
        url: "/Reports/Accidents/Involved_Vehicle",
      },
      {
        title: "Accident Responsibility",
        url: "/Reports/Accidents/Responsibility",
      },
      { title: "Accident Time Wise", url: "/Reports/Accidents/Time_Wise" },
      { title: "Fatal Report", url: "/Reports/Accidents/Fatal_Report" },
      { title: "Unit Wise", url: "/Reports/Accidents/Unit_Wise" },
      { title: "Injuries", url: "/Reports/Accidents/Injuries" },
      { title: "Accident Black Spot", url: "/Reports/Accidents/Black_Spot" },
    ],
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navItems, setNavItems] = React.useState<NavItem[]>(defaultNavItems);

  React.useEffect(() => {
    const role = localStorage.getItem("userRole");
    let computedNavItems: NavItem[] = [];

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
            { title: "Add Employee", url: "#" },
            { title: "Attendance", url: "#" },
            {
              title: "Leave Requests",
              url: "#",
            },
            { title: "Payroll", url: "#" },
          ],
        },
      ];
    } else if (role === "Accident_Management") {
      computedNavItems = [
        {
          title: "Accident management",
          url: "#",
          icon: User2,
          items: [
            {
              title: "Primary Report",
              url: "/Accident_Management/Accident_Report",
            },
            {
              title: "Inspector Report",
              url: "/Accident_Management/Inspector",
            },
            { title: "Workshop Report", url: "/Accident_Management/Work_Shop" },
          ],
        },
        {
          title: "Report",
          url: "#",
          icon: User2,
          items: [
            {
              title: "Accident Report",
              url: "/Accident_Management/Accident_Report",
            },
          ],
        },
      ];
    } else if (role === "Depo") {
      computedNavItems = [
        {
          title: "Accident Management",
          url: "#",
          icon: AlertTriangle,
          items: [
            {
              title: "Primary Report",
              url: "/Accident_Management/Accident_Report",
            },
            {
              title: "Workshop Report",
              url: "/Accident_Management/Work_Shop",
            },
          ],
        },
        {
          title: "Vehicle Management",
          url: "#",
          icon: Bus,
          items: [
            { title: "Add Vehicle", url: "/Depot/Add_Vehicle" },
            { title: "Schedule Vehicle", url: "#" },
            { title: "Maintenance Log", url: "#" },
            { title: "Vehicle Status", url: "#" },
          ],
        },
        {
          title: "Staff Management",
          url: "#",
          icon: UserCircle,
          items: [
            { title: "Assign Driver", url: "#" },
            { title: "Assign Conductor", url: "#" },
            { title: "Staff Performance", url: "#" },
          ],
        },
        {
          title: "Reports & Analytics",
          url: "#",
          icon: BarChart2,
          items: [
            { title: "Monthly Report", url: "#" },
            { title: "Depot Summary", url: "#" },
          ],
        },
      ];
    } else if (role === "Inspector") {
      computedNavItems = [
        {
          title: "Accident Management",
          url: "#",
          icon: FileWarning,
          items: [
            {
              title: "Inspector Report",
              url: "/Accident_Management/Inspector",
            },
          ],
        },
        {
          title: "Vehicle Inspection",
          url: "#",
          icon: ClipboardList,
          items: [
            { title: "Daily Inspection Log", url: "#" },
            { title: "Vehicle Report", url: "#" },
            { title: "Maintenance Follow-up", url: "#" },
          ],
        },
        {
          title: "Driver Oversight",
          url: "#",
          icon: User2,
          items: [
            { title: "Driver Feedback", url: "#" },
            { title: "Performance Alerts", url: "#" },
          ],
        },
        {
          title: "Audit & Reports",
          url: "#",
          icon: BarChart2,
          items: [
            { title: "Depot Audit Summary", url: "#" },
            { title: "Accident Analytics", url: "#" },
          ],
        },
      ];
    } else {
      computedNavItems = defaultNavItems;
    }
    setNavItems(markDisabledUrls(computedNavItems));
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcherStatic
          team={{
            name: "KTRAC",
            logo: "/logo.png",
            plan: "Enroute Kerala",
          }}
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
