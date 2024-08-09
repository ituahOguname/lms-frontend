"use client"
import React, {FC} from 'react';
import PageTitle from "../components/pageTitle";
import Notifcation from "../components/notifcation";
import { UserNav } from "../components/user-nav";
import CreateCourse from '../components/create-course';

type Props = {

}

const page:FC<Props> = ({}) => {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-12">
          <PageTitle title="Create Course" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
            <Notifcation />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full p">
        <CreateCourse/>
      </div>
    </>
  )
}

export default page