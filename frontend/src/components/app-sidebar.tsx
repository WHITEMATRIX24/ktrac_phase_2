"use client";

import * as React from "react";
import { LayoutDashboard, ShoppingBag, Layers, PieChart } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcherStatic } from "./team-switcher";

// Sample data
const data = {
  user: {
    name: "Ktrac",
    email: "Admin",
    avatar: "/logo.png",
  },
  teams: [
    {
      name: "Ktrac",
      logo: "/logo.png",
      plan: "Enroute Kerala",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "Revenue", url: "/Dashboard/Revenue" },
        { title: "Vehicle Details", url: "/Dashboard/Vehicle_Details" },
        { title: "Bus Allotment", url: "/Dashboard/Bus_Allotment" },
        { title: "Dockyard", url: "/Dashboard/Dockyard" },
        { title: "HR", url: "/Home/Dashboard/Vehicle_Details" },
      ],
    },
    {
      title: "Revenue",
      url: "#",
      icon: ShoppingBag,
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
        { title: "KMPL Report", url: "#" },
        { title: "Job Report", url: "#" },
        { title: "Driver Report", url: "#" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcherStatic team={data.teams[0]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <p className="text-center text-[12px] text-gray-500">Ktrac V 2.0</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
