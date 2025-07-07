import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"

export function TeamSwitcherStatic({
  team,
}: {
  team: {
    name: string
    logo: string  // now a string (image path)
    plan: string
  }
}) {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="border-1 border-white">
          <div
            className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
            onClick={toggleSidebar}
          >
            <img
              src={team.logo}
              alt="Team Logo"
              className="h-10 w-10 object-contain"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium text-white">{team.name}</span>
            <span className="truncate text-xs text-white">{team.plan}</span>
          </div>
          <Menu onClick={toggleSidebar} className="ml-auto text-white" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
