"use client"
import React, {FC, useState} from "react"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BiSolidPencil } from "react-icons/bi";
import {AiOutlineDelete, AiOutlinePlusCircle} from "react-icons/ai"
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any
}

const courseContentFormSchema = z.object({
    title: z.string(),
    videoUrl: z.string(),
    description: z.string(),
    videoSection: z.string(),
    suggestions: z.string(),
    videoLength: z.number(),
    linkTitle: z.string(),
    url: z.string(),
});

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const form = useForm<z.infer<typeof courseContentFormSchema>>({
    resolver: zodResolver(courseContentFormSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const { toast } = useToast();

  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleCollapsedToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLinks = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.videoLength === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast({
        title: "Please fill in all fields",
      });
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        //  use the last video section if available, else use input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        videoLength: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoLength === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast({
        title: "Please fill in all fields",
      });
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        videoLength: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast({
        title: "Section cannot be empty",
      });
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] mt-[50px] pl-8">
      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {courseContentData.map((item: any, index: number) => {
                const showSectionInput =
                  index === 0 ||
                  item.videoSection !==
                    courseContentData[index - 1].videoSection;
                return (
                  <>
                    <div key={index}>
                      {showSectionInput && (
                        <>
                          <div className="flex w-full items-center">
                            <FormField
                              control={form.control}
                              name="videoSection"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      id="name"
                                      type="text"
                                      placeholder="Name of your project"
                                      value={item.videoSection}
                                      className={`text-[20px] ${
                                        item.videoSection === "Untitled Section"
                                          ? "w-[170px]"
                                          : "w-min"
                                      } cursor-pointer bg-transparent focus:outline-none border-none focus:border-none`}
                                      onChange={e => {
                                        const updatedData = [...courseContentData,];
                                        updatedData[index].videoSection = e.target.value;
                                        setCourseContentData(updatedData);
                                      }}
                                      ref={field.ref}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <BiSolidPencil className="cursor-pointer" />
                          </div>
                          <br />
                        </>
                      )}
                      <div className="flex w-full items-center justify-between my-0">
                        {isCollapsed[index] ? (
                          <>
                            {item.title ? (
                              <p>
                                {index + 1}.{item.title}
                              </p>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <div></div>
                        )}
                        {/* {//  arrow button for collapsed video content} */}
                        <div className=" flex items-center">
                          <AiOutlineDelete
                            className={`text-[20px] mr-2 ${
                              index > 0 ? "cursor-pointer" : "cursor-no-drop"
                            }`}
                            onClick={() => {
                              if (index > 0) {
                                const updateData = [...courseContentData];
                                updateData.splice(index, 1);
                                setCourseContentData(updateData);
                              }
                            }}
                          />
                          <MdOutlineKeyboardArrowDown
                            size={25}
                            className=" dark:text-white text-black cursor-pointer"
                            style={{
                              transform: isCollapsed[index]
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            }}
                            onClick={() => handleCollapsedToggle(index)}
                          />
                        </div>
                      </div>
                      {!isCollapsed[index] && (
                        <>
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="title">
                                  Video Title
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="project plan..."
                                    value={item.title}
                                    onChange={e => {
                                      const updateData = [...courseContentData];
                                      updateData[index].title = e.target.value;
                                      setCourseContentData(updateData);
                                    }}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="videoUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="videoUrl">
                                  Video Url
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    id="videoUrl"
                                    type="text"
                                    placeholder="sdfs5655"
                                    value={item.videoUrl}
                                    onChange={e => {
                                      const updateData = [...courseContentData];
                                      updateData[index].videoUrl =
                                        e.target.value;
                                      setCourseContentData(updateData);
                                    }}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="videoLength"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="videoLength">
                                  Video Length (in minutes)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    id="videoLength"
                                    type="number"
                                    placeholder="24 min"
                                    value={item.videoLength}
                                    onChange={e => {
                                      const updateData = [...courseContentData];
                                      updateData[index].videoLength =
                                        e.target.value;
                                      setCourseContentData(updateData);
                                    }}
                                    ref={field.ref}
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
                                <FormLabel htmlFor="description">
                                  Video Description
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    id="description"
                                    type="text"
                                    placeholder="It's the description that makes it amzaing"
                                    onChange={e => {
                                      const updateData = [...courseContentData];
                                      updateData[index].description =
                                        e.target.value;
                                      setCourseContentData(updateData);
                                    }}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {item?.links.map((link: any, linkIndex: number) => (
                            <div key={index} className="mb-3 block">
                              <div className="w-full flex items-center justify-between">
                                <Label htmlFor="">Link {linkIndex + 1}</Label>
                                <AiOutlineDelete
                                  className={` text-[20px] mr-2 ${
                                    index === 0
                                      ? " cursor-no-drop"
                                      : "cursor-pointer"
                                  }`}
                                  onClick={() => {
                                    linkIndex === 0
                                      ? null
                                      : handleRemoveLinks(index, linkIndex);
                                  }}
                                />
                              </div>
                              <Input
                                type="text"
                                placeholder="Source Code.. (link title)"
                                value={link.title}
                                onChange={e => {
                                  const updatedData = [...courseContentData];
                                  updatedData[index].links[linkIndex].title =
                                    e.target.value;
                                  setCourseContentData(updatedData);
                                }}
                              />
                              <Input
                                type="url"
                                placeholder="SourceCode Url..(Link Url)"
                                value={link.url}
                                onChange={e => {
                                  const updatedData = [...courseContentData];
                                  updatedData[index].links[linkIndex].url =
                                    e.target.value;
                                  setCourseContentData(updatedData);
                                }}
                              />
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </>
                );
              })}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseContent;