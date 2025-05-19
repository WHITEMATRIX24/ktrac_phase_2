"use client";

import { usePathname } from "next/navigation";
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

export default function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const mainTitle = pathSegments[0]
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
    : "Home";
  const lastSegment = pathSegments[pathSegments.length - 1];
  const data = {
    user: {
      name: "Pramoj Sanker",
      email: "Admin",
      avatar: "/PRAMOJ.png",
    },
  };
  return (
    <header className="flex items-center justify-between px-6 py-2 text-black">
      <div>
        <h1 className="text-[24px] font-semibold leading-[1.2] mb-0 mt-[10px] uppercase">
          {mainTitle}
        </h1>
        <Breadcrumb className="h-[18px] ml-[1px] mt-[5px]">
          <BreadcrumbList className="text-[12px] leading-[1.2]">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-grey-500">
                {mainTitle}
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
                    {decodeURIComponent(lastSegment).replace(/-/g, " ")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <Calendar className="w-5 h-5 text-black opacity-70" />
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
        </div>

        <div className="flex items-center gap-2">
          {/* <Avatar className="h-7 w-7">
                        <AvatarImage src="/avatar.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="text-right">
                        <div className="text-[12px]">John Doe</div>
                        <div className="text-xs text-black/80">Admin</div>
                    </div> */}
          <NavUser user={data.user} />
        </div>
      </div>
    </header>
  );
}
