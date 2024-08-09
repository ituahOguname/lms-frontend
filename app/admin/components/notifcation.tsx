import React from 'react'
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSubContent,
    DropdownMenuSub,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

type Props = {}

const Notifcation = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Bell className='h-5 w-5 cursor-pointer'/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col items-center space-y-1">
            <h1 className="text-lg font-semibold leading-none">
              Notifications
            </h1>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='py-2 px-3 cursor-pointer hover:bg-neutral-50 transition flex items-start gap-2'>
            <p>Text</p>
            <p>Date</p>
            <span>Read</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Notifcation;