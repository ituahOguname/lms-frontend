import React, {FC} from 'react';
import { IoMdCheckmarkCircle } from "react-icons/io";

type Props = {
    active: number;
    setActive: (active:number) => void;
}

const CourseOption:FC<Props> = ({active, setActive}) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return(
    <div>
        {
            options.map((option:any, index:number) => (
                <div key={index} className='w-full flex py-5'>
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${active + 1 > index ? "bg-black" : "bg-[#384766]"} relative`}>
                        <IoMdCheckmarkCircle className='text-[20px] text-white'/>
                        {index !== options.length - 1 && (
                            <div className={`absolute h-[25px] w-1 ${active + 1 > index ? "bg-black" : "bg-[#384766]"} bottom-[-100%]`}/>
                        )}
                    </div>
                    <h5 className={` pl-3 ${active === index ? " text-black" : "text-black"} text-[18px]`}>
                        {option}
                    </h5>
                </div>
            ))
        }
    </div>
  ) 
}

export default CourseOption