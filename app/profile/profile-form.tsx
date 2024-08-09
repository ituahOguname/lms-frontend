"use client"
import React, {FC, useEffect, useState} from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import avatarIcon from "../../public/assets/avatar.png";
import { Camera } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useUpdateAvatarMutation, useEditProfileMutation } from "@/redux/features/user/userApi"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

const profileFormSchema = z.object({
  fullname: z.string().min(2, {message: "Fullname must be at least 2 characters.",}).max(30, {message: "Username must not be longer than 30 characters.",}),
  email: z.string().email(),
})


type Props = {
 avatar: string | null;
 user: any;
}


const ProfileForm: FC<Props> = ({avatar, user}) => {
  const {toast} = useToast();
  const [name, setName] = useState(user && user.className);
  const [editProifle, {isSuccess:success, error:errorUpdate}] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, {isSuccess, error}] = useUpdateAvatarMutation()
  const {} = useLoadUserQuery(undefined, {skip: loadUser ? false : true})


  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues:{fullname: user?.name || "", email:user?.email || ""},
    mode: "onChange",
  })

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if(fileReader.readyState === 2) {
        const avatar = fileReader.result
        updateAvatar(
          avatar
        );
      }
    }; 
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if(isSuccess || success){
      toast({
        title: "Updated Succesfully"
      })
      setLoadUser(true)
    }
    if(error || errorUpdate){
      toast({
        variant: "destructive",
        title: "Update Failed!",
      })
    }
  }, [isSuccess, error, success, errorUpdate, toast])
  

  async function onSubmit({fullname}: z.infer<typeof profileFormSchema>) {
    if(name !== "") {
      await editProifle({fullname})
    }
  }


  return (
    <>
      <div className="w-full h-full flex justify-center">
        <div className="relative">
            <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt="profile-pic"
            width={180}
            height={180} 
            className="w-[180px] h-[180px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] dark:bg-slate-900 bg-slate-200 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <Camera size={20} className=" text-black dark:text-white" />
            </div>
          </label>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fullname">Fullname</FormLabel>
                <FormControl>
                  <Input id="fullname" type="text" {...field}/>
                </FormControl>
                <FormDescription>
                  Enter your full name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input id="email" type="email" readOnly {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </>
  )
}

export default ProfileForm