import {
  GalleryVerticalEnd,
  Settings2,
  User,
  Wallet
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Jaheer Bukhari",
    email: "excellencyservices@rediffmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Bharatiya Popular Party",
      logo: GalleryVerticalEnd,
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Members Details",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Member",
          url: "#",
        },
        {
          title: "Primary Member",
          url: "#",
        },
        {
          title: "Active Member",
          url: "#",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "Payments",
          url: "#",
        },
        {
          title: "Transactions",
          url: "#",
        },
        {
          title: "Donations",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Account",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
