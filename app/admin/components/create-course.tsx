"use client";
import React, { useState } from "react";
import CourseOption from "./course-option";
import CourseInformation from "./course-information";
import CourseData from "./course-data";
import CourseContent from "./course-content";
import { set } from "zod";

type Props = {};

const CreateCourse = (props: Props) => {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSections: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {

  }


  return (
    <div className="w-full min-h-screen flex">
        <div className="w-[80%]">
            {
                active === 0 && (
                    <CourseInformation
                     courseInfo={courseInfo}
                     setCourseInfo={setCourseInfo}
                     active={active}
                     setActive={setActive}
                    />
                )
            }
            {
              active === 1 && (
                <CourseData
                 benefits={benefits}
                 setBenefits={setBenefits}
                 prerequisites={prerequisites}
                 setPrerequisites={setPrerequisites}
                 active={active}
                 setActive={setActive}
                />
              )
            }
            {
              active === 2 && (
                <CourseContent
                 active={active}
                 setActive={setActive}
                 courseContentData={courseContentData}
                 setCourseContentData={setCourseContentData}
                 handleSubmit={handleSubmit}
                />
              )
            }
        </div>
        <div className="w-[20%] h-screen mt-[50px] fixed z-[-1] right-0">
            <CourseOption active={active} setActive={setActive}/>
        </div>
    </div>
  )
};

export default CreateCourse;
