"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Calendar, SearchIcon, Settings } from "lucide-react";
import { NavUser } from "./nav-user";
import NotificationSystem from "./Notification";

interface User {
  name: string;
  email: string;
  avatar: string;
}

export default function Header() {
  const [roles, setRoles] = useState<string | null>(null);
  const pathname = usePathname() ?? "";
  const pathSegments = pathname.split("/").filter(Boolean);

  const mainTitle = pathSegments[0]
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
    : "Home";
  const lastSegment = pathSegments[pathSegments.length - 1];

  const [user, setUser] = useState<User>({
    name: "Pramoj Sanker",
    email: "Admin",
    avatar: "/PRAMOJ.png",
  });

  useEffect(() => {
    const role = sessionStorage.getItem("userRole") ?? "";

    setRoles(role);
    let userData = user;
    console.log(role);
    if (role === "Finance") {
      userData = {
        name: "Finance Unit",
        email: "Supervisor",
        avatar: "/Captureuseravathar.PNG",
      };
    } else if (role === "Maintenance") {
      userData = {
        name: "Maintenance Unit",
        email: "Supervisor",
        avatar: "/Captureuseravathar.PNG",
      };
    } else if (role === "Employee") {
      userData = {
        name: "HR Unit",
        email: "Supervisor",
        avatar: "/Captureuseravathar.PNG",
      };
      
    } 
    else if (role === "superAdmin") {
      userData = {
        name: "Pramoj Sanker",
        email: "SuperAdmin",
        avatar: "/PRAMOJ.png",
      };
      
    }
    else if (role === "Accident_Management") {
      userData = {
        name: "Accident Managemet",
        email: "Supervisor",
        avatar: "/Captureuseravathar.PNG",
      };
    } else if (role === "Depo") {
      userData = {
        name: "Depot Managemet",
        email: "Supervisor",
        avatar: "/Captureuseravathar.PNG",
      };
    } else if (role === "Inspector") {
      userData = {
        name: "Inspector",
        email: "Supervisor",
        avatar: "/Captureuseravathar.PNG",
      };
    }

    setUser(userData);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-2  text-black border-b-2 border-[var(--sidebar)]">
      <div>
        <h1 className="text-[16px] font-bold leading-[1.2] mb-0 mt-[10px] uppercase">
          {decodeURIComponent(mainTitle).replace(/[-_]/g, " ")}
        </h1>
        <Breadcrumb className="h-[18px] ml-[1px] mt-[5px]">
          <BreadcrumbList className="text-[12px] leading-[1.2]">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-grey-500">
                {decodeURIComponent(mainTitle).replace(/[-_]/g, " ")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#C1292E]" />
            <BreadcrumbItem>
              <BreadcrumbEllipsis className="text-grey-500" />
            </BreadcrumbItem>
            {lastSegment && (
              <>
                <BreadcrumbSeparator className="text-[#C1292E]" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-grey-500">
                    {decodeURIComponent(lastSegment).replace(/[-_]/g, " ")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        {/* <Calendar className="w-5 h-5 text-black opacity-70" />
        <Settings className="w-5 h-5 text-black opacity-70" />
        <div className="relative w-54">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full h-[24px] pr-8 rounded-md px-3 text-[12px] text-black bg-transparent border border-gray-400"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-xs">
            <SearchIcon className="h-4 w-4" />
          </div>
        </div> */}

        {/* Add Notification System Here */}
        {roles != "Inspector" && <NotificationSystem />}
        <div className="flex items-center gap-2">
          <NavUser user={user} />
        </div>
      </div>
    </header>
  );
}
