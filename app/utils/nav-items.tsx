'use client'
import Link from 'next/link';
import React, {FC} from 'react'

interface Props {
    activeItem: number;
    isMobile: boolean
}

export const navItemsData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Courses",
        url: "/courses",
    },
    {
        name: "About",
        url: "/about",
    },
    {
        name: "Policy",
        url: "/policy",
    },
    {
        name: "FAQ",
        url: "/faq",
    }
];

const NavItems: FC<Props> = ({activeItem, isMobile}) => {
    return (
        <>
          <div className="hidden 800px:flex">
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href={`${i.url}`} key={index} passHref>
                  <span
                    className={`${
                      activeItem === index //this activeitem is header nav item number in header and come from page.tsx
                        ? 'dark:text-[#37a39a] text-[crimson]'
                        : 'dark:text-white text-black'
                    } text-[18px] px-6 font-Poppins font-[400]`}>
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
          {/* for mobile screen  */}
          {isMobile && (
            <div className="800px:hidden mt-5">
              <div className="w-full text-center py-6">
                <Link href={'/'} passHref>
                  <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>ELearning</span>
                </Link>
              </div>
              {navItemsData &&
                navItemsData.map((i, index) => (
                  <Link href={i.url} passHref key={index}>
                    <span
                      className={`${
                        activeItem === index //this activeitem is header nav item number in header and come from page.tsx
                          ? 'dark:text-[#37a39a] text-[crimson]'
                          : 'dark:text-white text-black'
                      } block py-5 text-[18px] px-6 font-Poppins font-[400]`}>
                      {i.name}
                    </span>
                  </Link>
                ))}
            </div>
          )}
        </>
      );
}

export default NavItems