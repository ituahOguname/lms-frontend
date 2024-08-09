"use client"
import React, {FC} from 'react'
import Heading from '../utils/heading'
import AdminProtected from '../hooks/adminProtected'


type Props = {}

const page:FC<Props> = (props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning"
          description="Elearning is a platfrom for students to learn and get help from teachers"
          keywords="Programming, MERN, Renewable Energy, Climate Change, "
        />
        <div>homepage</div>
      </AdminProtected>
    </div>
    
  )
}

export default page