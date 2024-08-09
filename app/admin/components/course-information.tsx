"use client"
import React, {FC, useState} from "react"
import * as z from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from 'lucide-react';
import Image from "next/image";


const courseInformationFormSchema = z.object({
  name: z.string({required_error:"Please enter the name"}).min(4, {message: "Name must be at least 4 characters.",}),
  description: z.string({required_error:"Please enter the description"}).min(4, {message: "Description must be at least 2 characters.",}),
  price: z.string({required_error:"Please enter the price"}).min(1, {message: "Required",}),
  estimatedPrice: z.string(),
  tags: z.string().min(3, {message: "You have to fill in some tags",}),
  level: z.string({required_error:"Please enter the course level"}).min(1, {message: "Required",}),
  demoUrl: z.string({required_error:"Please enter the demo url"}).min(6, {message: "Required",}),
  thumbnail: z.string(),
});

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseInformation:FC<Props> = ({courseInfo, setCourseInfo, active, setActive}) => {
  const [dragging, setDragging] = useState(false)

  const handleImageUpload = (e:any) => {
    const file = e.target?.files[0];
    if(file){
      const reader = new FileReader();

      reader.onload = (e:any) => {
        if (reader.readyState === 2){
          setCourseInfo({...courseInfo, thumbnail:reader.result})
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeave = (e:any) => {
    e.preventDefault();
    setDragging(false);
  }

  const handleDrop = (e:any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if(file){
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({...courseInfo, thumbnail:reader.result});
        
      };
      reader.readAsDataURL(file);
    }
  }


  const form = useForm<z.infer<typeof courseInformationFormSchema>>({
    resolver: zodResolver(courseInformationFormSchema),
    defaultValues:{name:"", description:"", price:"", estimatedPrice:"", tags:"", level:"", demoUrl:"", thumbnail:""},
    mode: "onChange"
  })

  async function onSubmit({name, description, price, estimatedPrice, tags, level, demoUrl, thumbnail}: z.infer<typeof courseInformationFormSchema>) {
    setActive(active + 1)
  }

  return (
    <div className="w-[80%] mt-[50px] pl-8">
      <Card className="">
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Course Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Name of your project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Write something amazing"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-x-8">
                <div className="">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="price">Course Price</FormLabel>
                        <FormControl>
                          <Input
                            id="price"
                            type="number"
                            placeholder="Enter the price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="estimatedPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="estimatedPrice">
                          Estimated Price (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="estimatedPrice"
                            type="number"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="tags">Course Tags</FormLabel>
                    <FormControl>
                      <Input
                        id="tags"
                        type="text"
                        placeholder="Energy, Renewable, Solar, Climate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-x-8">
                <div className="">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="level">Course Level</FormLabel>
                        <FormControl>
                          <Input
                            id="level"
                            type="text"
                            placeholder="Enter the course level"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="demoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="demoUrl">Demo Url</FormLabel>
                        <FormControl>
                          <Input
                            id="demoUrl"
                            type="text"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            accept="image/*"
                            type="file"
                            id="file"
                            className="hidden"
                            onChange={(e) => {
                              handleImageUpload(e);
                              field.onChange(e);
                            }}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="file"
                          className={`w-full min-h-[10vh] flex flex-col items-center justify-center border-2 border-dashed cursor-pointer border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                            dragging ? "bg-blue-500" : "bg-transparent"
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          {courseInfo.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={courseInfo.thumbnail}
                              alt=""
                              className="max-h-full w-full object-cover"
                              
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center ">
                              <Upload className="w-8 h-8 mb-2 text-gray-400" />
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Drag and drop files here or click to select
                              </p>
                            </div>
                          )}
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full flex justify-end mt-2">
              <Button type="submit" value="Next">Next</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CourseInformation