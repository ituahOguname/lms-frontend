"use client"
import React, {FC, useState,} from 'react'
import { useSelector } from 'react-redux';
import Heading from '../utils/heading';
import Header from '../components/header';
import Protected from '../hooks/useProtected';
import {redirect} from "next/navigation"
import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './components/sidebar-nav';
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';

interface ProfileLayoutProps {
    children: React.ReactNode
    user: any
}
  

const ProfileLayout:FC<ProfileLayoutProps> = ({children}) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login")
  const [scroll, setScroll] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const[logout, setLogout] = useState(false)
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false
  });

const {user} = useSelector((state:any) => state.auth);

console.log(user)

const logOutHandler = async () => {
  setLogout(true);
  await signOut();
  redirect("/")
}

if(typeof window !== "undefined"){
  window.addEventListener("scroll", () =>{
    if (window.scrollY > 85) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  })
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Change Password",
    href: "/profile/change-password",
  },
  {
    title: "Enrolled Courses",
    href: "",
  },
  user?.role === "admin" &&
  {
    title: "Admin Dashboard",
    href: "/admin/daashboard",
  },
  {
    title: "Logout",
    href: "/",
    onClick: logOutHandler,
  },
].filter(item => item !== false); // Remove null items

console.log(user);

  return (
    <>
      <Protected>
        <Heading
          title={`${user?.name} Profile - Elearning`}
          description="Elearning is a platfrom for students to learn and get help from teachers"
          keywords="Programming, MERN, Renewable Energy, Climate Change, "
        />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl w-[65%] h-[800px] mx-auto mt-16 mb-16">
          <div className="space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">My Account</h2>
              <p className="text-muted-foreground">
                Manage and update your account.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5 overflow-x-auto md:max-w-[950px]">
                <SidebarNav
                 user= {user}
                 items= {sidebarNavItems}
                 avatar= {avatar} 
                />
              </aside>
              <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
          </div>
        </div>
      </Protected>
    </>
  );
}

export default ProfileLayout;