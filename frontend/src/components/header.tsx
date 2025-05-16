"use client"

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchIcon } from "lucide-react"

export default function Header() {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").filter(Boolean)
    const mainTitle = pathSegments[0]
        ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
        : "Home"
    const lastSegment = pathSegments[pathSegments.length - 1]

    return (
        <header className="flex items-center justify-between px-6 py-2  text-black">
            <div>
                <h1 className="text-[18px] font-semibold leading-[1.2] mb-0">{mainTitle}</h1>
                <Breadcrumb className="h-[18px]">
                    <BreadcrumbList className="text-[12px] leading-[1.2]">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="text-black">
                                {mainTitle}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-black" />
                        <BreadcrumbItem>
                            <BreadcrumbEllipsis className="text-black" />
                        </BreadcrumbItem>
                        {lastSegment && (
                            <>
                                <BreadcrumbSeparator className="text-black" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-black">
                                        {decodeURIComponent(lastSegment).replace(/-/g, " ")}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>


            <div className="flex items-center gap-4">
                <div className="relative w-64">
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
                    <Avatar className="h-7 w-7">
                        <AvatarImage src="/avatar.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="text-right">
                        <div className="text-[12px]">John Doe</div>
                        <div className="text-xs text-black/80">Admin</div>
                    </div>
                </div>
            </div>
        </header>
    )
}
