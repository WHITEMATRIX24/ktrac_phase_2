// NO "use client"

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"

export function TeamSwitcherStatic({
  team,
}: {
  team: {
    name: string
    logo: React.ElementType
    plan: string
  }
}) {
  const { toggleSidebar } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
            onClick={toggleSidebar}>
            <team.logo className="size-4" />

          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{team.name}</span>
            <span className="truncate text-xs">{team.plan}</span>
          </div>
          <Menu onClick={toggleSidebar} className="ml-auto" />

        </SidebarMenuButton>

      </SidebarMenuItem>
    </SidebarMenu>
  )
}
