/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
import HeroImage from "./hero-image";

interface Props {}

const Hero: FC<Props> = props => {
  return (
    <div className="w-full 1000px:flex items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[800px] 1500px:w-[800px] 1100px:h-[400px] 1100px:w-[400px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image
          src={require("../../../public/assets/banner-img-1.png")}
          width={250}
          height={250}
          alt=""
          className="object-contain 1100px:max-w-[70%] w-[70%] 1500px:max-w-[75%] h-[auto] z-[10]"
        />
      </div>

      {/* second box  */}

      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]">
          Improve Your{" "}
          <span
            className="inline-block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(77, 136, 196, 0.78), rgba(150, 75, 225, 0.78))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Online Learning
          </span>{" "}
          Experience
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
          We have 40k+ Online Courses & 500k+ Online registered students. Find
          your desired Courses.
        </p>
        <br />
        <br />

        {/* second box > one   */}
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative ">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent border border-[#0000004e] dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[30px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[30px]">
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <br />
        <br />
        {/* second box > two   */}

        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          {/*  */}
          <HeroImage srcData={require("../../../public/assets/client-1.jpg")} />
          <HeroImage srcData={require("../../../public/assets/client-2.jpg")} />
          <HeroImage srcData={require("../../../public/assets/client-3.jpg")} />
          {/*  */}
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
            500K+ People already trusted us.{" "}
            <Link
              href="/courses"
              className="dark:text-[#46e256] text-[crimson]"
            >
              View Courses
            </Link>
          </p>
        </div>
        <br />
      </div>
      {/* second box end */}
    </div>
  );
};

export default Hero;
