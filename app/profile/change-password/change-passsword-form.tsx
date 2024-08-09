"use client"
import React, {FC, useEffect, useState}  from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast";
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';

const changePasswordFormSchema = z.object({
    oldPassword: z.string({required_error:"Please enter your password"}).min(8, { message: "Must be 8 or more characters long" }),
    newPassword: z.string({required_error:"Please enter your password"}).min(8, { message: "Must be 8 or more characters long" }),
    confirmPassword: z.string({required_error:"Please enter your password"}).min(8, { message: "Must be 8 or more characters long" }),  
  })

type Props = {}

const ChangePasswordForm: FC<Props> = ({}) => {
  const {toast} = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");
  const [updatePassword, {isSuccess, error}] = useUpdatePasswordMutation();

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues:{oldPassword: "", newPassword:"", confirmPassword:""},
    mode: "onChange",
  })

  useEffect(() => {
    if(isSuccess){
      toast({
        title:"Password changed successfully"
      })
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast({
          variant: "destructive",
          title: errorData.data.message
        })
      } 
    }
  }, [isSuccess, error, toast])

  async function onSubmit({oldPassword, newPassword, confirmPassword}: z.infer<typeof changePasswordFormSchema>) {
    if(newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match"
      })
    }else {
      await updatePassword({oldPassword, newPassword})
    }
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <Input id="oldPassword" type="password" placeholder="password!@%" {...field} />
              </FormControl>
              <FormDescription>Enter your old password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input id="newPassword" type="password" {...field} />
              </FormControl>
              <FormDescription>Enter your new password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confrim password</FormLabel>
              <FormControl>
                <Input id="confrimPassword" type="password" {...field} />
              </FormControl>
              <FormDescription>Enter your new password again</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Password</Button>
      </form>
    </Form>
  );
}

export default ChangePasswordForm;