"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    onClick?: () => void;
  }[]
  user: any;
  avatar: string | null;
}

export function SidebarNav({ user,avatar,className,items,...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link legacyBehavior key={item.href} href={item.href} passHref>
          {/* Handle the onClick event using an arrow function */}
          <a
            onClick={(e) => {
              if (item.onClick) {
                item.onClick(); // Call onClick function if it exists
              }
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            {item.title}
          </a>
        </Link>
      ))}
    </nav>
  )
}