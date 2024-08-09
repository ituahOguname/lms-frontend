'use client'
import Link from 'next/link';
import React, {FC, useEffect, useState} from 'react'
import NavItems from '@/app/utils/nav-items';
import CustomModal from '@/app/utils/customModal';
import { ThemeSwitcher } from '@/app/utils/theme-switcher';
import { Menu,UserRound } from 'lucide-react';
import Login from './Auth/login';
import SignUp from './Auth/sign-up';
import Verification from './Auth/verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from "../../public/assets/avatar.png"
import { useToast } from '../../components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { useLogOutQuery, useSocialAuthMutation } from '@/redux/features/auth/authApi';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
}

const Header: FC<Props> = ({activeItem, setOpen, route, open, setRoute}) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [reverse, setReverse] = useState(false);
    const {user} = useSelector((state:any) => state.auth);
    const {data} = useSession();
    const {toast} = useToast()
    const [socialAuth, {isSuccess, error}] = useSocialAuthMutation();
    const[logout, setLogout] = useState(false)
    const {} = useLogOutQuery(undefined, {
        skip: !logout ? true : false
    });

    useEffect(() => {
        if(!user) {
            if(data) {
                socialAuth({email:data?.user?.email, name:data?.user?.name, avatar:data?.user?.image})
            }
        }
        if(data === null ) {
            if(isSuccess){
                toast({
                    title: "Login Successful!",
                })
            }
        }
        if(data === null){
            setLogout(true);
        }
    }, [data, user, socialAuth, toast, isSuccess])
    
    
    if(typeof window !== 'undefined'){
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setActive(true);
            }else {
                setActive(false);
            }
        });
    }

    const handleClose = (e:any) => {
        if(e.target.id === "screen"){
            setReverse(true)
           { setOpenSidebar(false)}
        }
    }

    console.log(user);
    

  return (
    <div className='w-full relative'>
        <div className={`${active ? "fixed top-0 left-0 w-full h-[80px] z-[80] opacity-[1] bg-white dark:bg-[#0a0a0a] border-b transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] "}`}>
            <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
                <div className='w-full h-[80px] flex items-center justify-between p-3'>
                    <div>
                        <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                            Elearning
                        </Link>
                    </div>  
                    <div className="flex items-center">
                        <NavItems
                        activeItem={activeItem}
                        isMobile={false}
                        />
                        {
                            user ? (
                                <Link href={"/profile"}>
                                    <Image
                                    src={user.avatar ? user.avatar.url : avatar} 
                                    alt=''
                                    width={50}
                                    height={50}
                                    className="w-[50px] h-[50px] rounded-full cursor-pointer"
                                    style={{border: activeItem === 5 ? "2px solid #ffc107" : ""}}
                                    />
                                </Link>
                            ): (
                                <UserRound size={20} className="hidden 800px:block cursor-pointer dark:text-white text-black" onClick={() => setOpen(true)}/>
                            )
                        }
                        <div className="800px:hidden">
                            <Menu size={25} className="cursor-pointer dark:text-white text-black" onClick={() => setOpenSidebar(true)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* mobile sidebar */}
                {
                    openSidebar && (
                        <div className="fixed w-full h-screen top-0 left-0 z-[99999]" onClick={handleClose} id="screen">
                            <div className="w-[50%] fixed z-[999999999] h-screen bg-white dark:bg-background border dark:bg-opacity-60 top-0 right-0">
                                <NavItems activeItem={activeItem} isMobile={true}/>
                                <UserRound size={25} className="cursor-pointer ml-5 my-2 text-black dark:text-white" onClick={() => setOpen(true)}/>
                                <br />
                                <p className="text-[16px] text-center px-2 pl-5 text-black dark:text-white">
                                    Copyright 2023 ELearning
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        {
            route === "Login" && (
                <>
                {
                    open && (
                        <CustomModal
                        open={open}
                        setOpen={setOpen}
                        setRoute={setRoute}
                        activeItem={activeItem}
                        component={Login}
                        />
                    )
                }
                </>
            )
        }
        {
            route === "Sign-Up" && (
                <>
                {
                    open && (
                        <CustomModal
                        open={open}
                        setOpen={setOpen}
                        setRoute={setRoute}
                        activeItem={activeItem}
                        component={SignUp}
                        />
                    )
                }
                </>
            )
        }
        {
            route === "Verification" && (
                <>
                {
                    open && (
                        <CustomModal
                        open={open}
                        setOpen={setOpen}
                        setRoute={setRoute}
                        activeItem={activeItem}
                        component={Verification}
                        />
                    )
                }
                </>
            )
        }
    </div>
  )
}

export default Header;