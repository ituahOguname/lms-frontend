"use client"
import React, {FC, useState} from 'react'
import Nav from './nav'
import {
    Users2,
    LayoutDashboard,
    FileText,
    Video,
    MonitorPlay,
    FileQuestion,
    Files,
    Users,
    BarChartBig,
    Map,
    CalendarClock, 
    Settings,
    LogOut,
    ChevronRight
  } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useWindowWidth } from '@react-hook/window-size'


interface Props {
}

const SideNavbar:FC<Props> = ({}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const onlyWidth = useWindowWidth()
  const mobileWidth = onlyWidth < 778;

  function toggleSidebar(){
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24'>
      {!mobileWidth && (
      <div className='absolute right-[-20px] top-7'>
        <Button onClick={toggleSidebar} variant="secondary" className='rounded-full p-2'>
          <ChevronRight/>
        </Button>
      </div>
      )}
      <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Dashboard",
              icon: LayoutDashboard,
              variant: "default",
              href: "/admin/dashboard"
            },
          ]}
        />
        <Separator/>
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Users",
              icon: Users2,
              variant: "ghost",
              href: "/admin/users"
            },
            {
              title: "Invoices",
              icon: FileText,
              variant: "ghost",
              href: "/admin/invoices"
            },
          ]}
        />
        <Separator/>
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Create Course",
              icon: Video,
              variant: "ghost",
              href: "/admin/create-course"
            },
            {
              title: "Live Courses",
              icon: MonitorPlay,
              variant: "ghost",
              href: "/admin/live-courses"
            },
          ]}
        />
        <Separator/>
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "FAQ",
              icon: FileQuestion,
              variant: "ghost",
              href: "/admin/faq"
            },
            {
              title: "Categories",
              icon: Files,
              variant: "ghost",
              href: "/admin/categories"
            },
          ]}
        />
        <Separator/>
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Manage Team",
              icon: Users,
              variant: "ghost",
              href: "/admin/manage-team"
            },
            {
              title: "Course Analytics",
              icon: BarChartBig,
              variant: "ghost",
              href: "/admin/course-analytics"
            },
            {
              title: "Orders Analytics",
              icon: Map,
              variant: "ghost",
              href: "/admin/orders-analytics"
            },
            {
              title: "User Analytics",
              icon: CalendarClock,
              variant: "ghost",
              href: "/admin/user-analytics"
            },
          ]}
        />
        <Separator/>
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Settings",
              icon: Settings,
              variant: "ghost",
              href: ""
            },
            {
              title: "Logout",
              icon: LogOut,
              variant: "ghost",
              href: ""
            },
          ]}
        />
    </div>
  )
}

export default SideNavbar;