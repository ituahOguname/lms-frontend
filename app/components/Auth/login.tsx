"use client"
import React, {FC, useState, useEffect} from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { Linkedin } from 'lucide-react';
import { BiLogoGoogle } from 'react-icons/bi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import {signIn} from "next-auth/react";




interface Props {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const loginSchema = z.object({
    email: z.string({required_error:"Please enter your email"}).email({message:"Invalid email address"}),
    password: z.string({required_error:"Please enter your password"}).min(8, { message: "Must be 8 or more characters long" })
})

const Login: FC<Props> = ({setRoute, setOpen}) => {
    const {toast} = useToast();
    const [login, {isSuccess, error}] = useLoginMutation();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: "", password:""},
        mode: "onChange"
    })

    async function onSubmit({email, password}: z.infer<typeof loginSchema>) {
        await login({email, password})
    }

    useEffect(() => {
      if(isSuccess) {
        toast({
            title: "Login Successful!",
        })
        setOpen(false)
      }if(error) {
        if("data" in error) {
            const errorData = error as any
            toast({
                variant: "destructive",
                title: "Registration Error",
                description: (errorData.data.message),
            })
        }
      }
    }, [isSuccess, error, setRoute, toast, setOpen])
    

  return (
    <Form{...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-[500px] h-[600px]">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-Poppins">Login to your account</CardTitle>
                    <CardDescription>
                    Log in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                    <Button variant="outline" className='text-[16px]' onClick={() => signIn("linkedin")}>
                        <Linkedin className="mr-2 h-5 w-5" />
                        LinkedIn
                    </Button>
                    <Button variant="outline" className='text-[16px]' onClick={() => signIn("google")}>
                        <BiLogoGoogle className="mr-2 h-6 w-6" />
                        Google
                    </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor='email' className='text-[16px] font-Poppins'>Email</FormLabel>
                                <FormControl>
                                    <Input id="email" type="email" placeholder="m@example.com" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor='password' className='text-[16px] font-Poppins'>Password</FormLabel>
                                <FormControl>
                                    <Input id="password" type="password"  placeholder="password!@%" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                </CardContent>
                <CardFooter className='pt-7'>
                    <Button type="submit" value="Login" className="w-full text-[18px] font-Poppins">Log in</Button>
                </CardFooter>
                <h5 className="pt-2 text-center font-Poppins">
                        Dont have an account?{" "}
                        <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setRoute("Sign-Up")}>
                            Sign Up
                        </span>
                    </h5>
            </Card>
        </form>
    </Form>
  )
}

export default Login;