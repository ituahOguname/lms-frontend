"use client"
import React, {FC, useState} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type Props = {
    benefits: {title: string}[];
    setBenefits: (benefits: {title: string}[]) => void
    prerequisites: {title: string}[];
    setPrerequisites: (prerequisites: {title: string}[]) => void
    active: number;
    setActive: (active: number) => void;
}

const CourseData:FC<Props> = ({benefits, setBenefits, prerequisites, setPrerequisites, active, setActive}) => {
  const {toast} = useToast()
  const handleBenefitChange = (index:number, value:any)=> {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddbenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast({
        title: "Please fill in all fields"
      });
    }
  };
  return (
    <div className="w-[80%] pl-8 mt-[50px]">
        <Card>
          <CardHeader>
            <CardTitle>Course Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="email" className="text-[20px]">What are the benefits for students in this course?</Label>
              {
                benefits.map((benefit:any, index:number) => (
                  <Input
                   type="text"
                   className="mt-3"
                   key={index}
                   name="benefit"
                   placeholder="You will be able to build you ..."
                   value={benefit.title}
                   onChange={(e) => handleBenefitChange(index, e.target.value)}
                  />
                ))
              }
              <IoMdAddCircleOutline style= {{margin: "10px 0px", cursor: "pointer", width: "30px"}} size={25} onClick={handleAddbenefits}/>
            </div>
            <div>
              <Label htmlFor="email" className="text-[20px]">What are the prerequisites for students in this course?</Label>
              {
                prerequisites.map((prerequisite:any, index:number) => (
                  <Input
                   type="text"
                   className="mt-3"
                   key={index}
                   name="prerequisites"
                   placeholder="You just need to be willing to learn new things"
                   value={prerequisite.title}
                   onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                  />
                ))
              }
              <IoMdAddCircleOutline style= {{margin: "10px 0px", cursor: "pointer", width: "30px"}} size={25} onClick={handleAddPrerequisites}/>
            </div>
            <div className="w-full flex justify-between">
              <Button onClick={() => prevButton()}>Previous</Button>
              <Button onClick={() => handleOptions()}>Next</Button>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default CourseData;