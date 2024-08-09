'use client';
import React, {FC, useState} from "react";
import Heading from "./utils/heading";
import Header from "@/app/components/header";
import Hero from "@/app/components/routes/hero";


interface Props {

}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");


  return (
    <div>
        <Heading
        title="ELearning"
        description="Elearning is a platfrom for students to learn and get help from teachers"
        keywords="Programming, MERN, Renewable Energy, Climate Change, "
      /> 
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      <Hero/>
    </div>
  )
}

export default Page;