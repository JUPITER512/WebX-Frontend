import React from "react";
import { HoverEffect } from "../../Components/Cards";
import { useRecoilValue } from "recoil";
import { UserData } from "../../app/userData";
export const projects = [
  {
    title: "Code Seeker V2",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    id:'deepseek-coder-v2'
  },
  {
    title: "Llama 3",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    id:"llama3"
  },
  {
    title: "Phi 3",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    id:"phi3"
  },

 
];
const Home = () => {
  const userName=useRecoilValue(UserData('firstName'))
  const lastName=useRecoilValue(UserData('lastName'))
  return (
    <div className=" bg-gray-200 dark:bg-gray-600 w-full rounded-lg py-10">
      <h1 className=" text-2xl md:text-4xl  lg:text-4xl font-bold dark:text-gray-200 w-[50%] text-center mx-auto flex flex-wrap">
        Welcome  {userName+" "+lastName}
      </h1>
      <div className="max-w-5xl mx-auto px-8 my-10">
        <h2 className="text-4xl font-bold dark:text-gray-200 w-[50%] text-center mx-auto ">Please Select Ai Model for Chatbot</h2>
        <HoverEffect items={projects} />
      </div>
      </div>
    
  );
};

export default Home;
