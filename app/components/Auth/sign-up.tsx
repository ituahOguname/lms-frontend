"use client"
import React, {FC, useState, useEffect} from 'react';
import {useFormik} from "formik"
import * as Yup from "yup";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { Linkedin} from 'lucide-react';
import { BiLogoGoogle } from 'react-icons/bi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';
import { useRegisterMutation } from '@/redux/features/auth/authApi';



interface Props {
    setRoute: (route: string) => void;
}

const signUpSchema = z.object({
    name: z.string({required_error:"Please enter your name"}).min(2,{message:"Name must be at least 2 characters"}),
    email: z.string({required_error:"Please enter your email"}).email({message:"Invalid email address"}),
    password: z.string({required_error:"Please enter your password"}).min(8, { message: "Must be 5 or more characters long" })
})

type signUpFormValues = z.infer<typeof signUpSchema>

const SignUp: FC<Props> = ({setRoute}) => {
    const [show, setShow] = useState(false);
    const {toast} = useToast();
    const [register, { data, error, isSuccess }] = useRegisterMutation();
    

    useEffect(() => {
        if(isSuccess){
            const message = data?.message || "Registration successful";
            toast({
                title: "Registration Successful!",
                description: (message)
            })
            setRoute("Verification")
        }
        if(error){
            if("data" in error) {
                const errorData = error as any
                toast({
                    variant: "destructive",
                    title: "Registration Error",
                    description: (errorData.data.message),
                })
            }
        }
    }, [isSuccess, error, data, toast, setRoute])

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {name:"", email: "", password:""},
        mode: "onChange"
    })

    async function onSubmit({name, email, password}: z.infer<typeof signUpSchema>) {
        const data = {name, email, password} 
        await register(data)
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-[500px] h-[700px]">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-Poppins">Register to Elearning</CardTitle>
                    <CardDescription>
                    Sign up and start learning
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                    <Button variant="outline" className='text-[16px]'>
                        <Linkedin className="mr-2 h-5 w-5" />
                        LinkedIn
                    </Button>
                    <Button variant="outline" className='text-[16px]'>
                        <BiLogoGoogle className="mr-2 h-6 w-6"/>
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
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="name" className='text-[16px] font-Poppins'>Name</FormLabel>
                                    <FormControl>
                                        <Input id="name" type="text" placeholder="Enter your full name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
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
                <CardFooter className=''>
                    <Button type="submit" value="sign-up" className="w-full text-[18px] font-Poppins">Sign up</Button>
                </CardFooter>
                <h5 className="pt-2 text-center font-Poppins">
                    Already have an account?{" "}
                    <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setRoute("Login")}>
                        Log in
                    </span>
                </h5>
            </Card>
        </form>
    </Form>
  )
}

export default SignUp;