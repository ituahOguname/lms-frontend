"use client"
import { Poppins } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './utils/provider';
import { SessionProvider } from 'next-auth/react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from "./components/Loader/loader";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});


export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body className={cn('min-h-screen w-full',`${poppins.variable} ${josefin.variable}`)}>
        <Providers>
          <SessionProvider>
              <Custom>
                {children}
              </Custom>
              <Toaster/>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}

const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isLoading} = useLoadUserQuery({});
  return (
    <>
    {
      isLoading ? <Loader /> : <>{children}</>
    }
    </>
  )
}