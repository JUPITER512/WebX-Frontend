import React, { useState } from "react";
import Index from "../Index.jsx";
import Input from "../../../Components/Input.jsx";
import { signUpFields } from "../../../app/store.js";
import { useRecoilState } from "recoil";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useRecoilState(signUpFields("email"));
  const [password, setPassword] = useRecoilState(signUpFields("password"));
  const [file, setFile] = useState();
  const [firstName, setFirstname] = useRecoilState(signUpFields("firstname"));
  const [lastName, setlastname] = useRecoilState(signUpFields("lastname"));
  const [userName, setusername] = useRecoilState(signUpFields("username"));
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("Image", file); // Ensure 'Image' matches the name expected by your backend

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        formData
      );
      if (response.status == 200) {
        navigate("/sign-in");
      }
      setEmail("");
      setPassword("");
      setFile();
      setusername("");
      setlastname("");
      setFirstname("");
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      }
      // Handle error state or display error to the user
    }
  };

  const handleGoogleSignup = () => {
    console.log("Signing up with Google...");
  };

  return (
    <Index>
      <div className="border-[1px] border-gray-500 rounded-lg dark:border-gray-300 w-full lg:w-1/2 bg-white dark:bg-gray-800 m-auto min-h-[40rem] px-8 py-10 font-Playwrite shadow-[0_0px_20px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0px_20px_20px_rgba(255,255,255,0.1)]">
        <h1 className="text-center my-4 font-semibold text-2xl dark:text-white text-black">
          Signup Here
        </h1>

        {/* Google Signup Button */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-center"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label
              htmlFor="firstname"
              className="w-full md:w-1/3 text-black dark:text-gray-300"
            >
              First Name
            </label>
            <Input
              id="firstname"
              classes="w-2/3 md:w-1/3 rounded-md bg-gray-300 dark:bg-gray-300 antialiased px-2 py-1 bg-opacity-50 border-[1px] border-gray-800"
              recoilAtom={signUpFields("firstname")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label
              htmlFor="lastname"
              className="w-full md:w-1/3  text-black dark:text-gray-300"
            >
              Last Name
            </label>
            <Input
              id="lastname"
              classes="w-2/3 md:w-1/3 rounded-md bg-gray-300 dark:bg-gray-300 antialiased px-2 py-1 bg-opacity-50 border-[1px] border-gray-800"
              recoilAtom={signUpFields("lastname")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label
              htmlFor="username"
              className="w-full md:w-1/3 text-black dark:text-gray-300"
            >
              Username
            </label>
            <Input
              id="username"
              classes="w-2/3 md:w-1/3 rounded-md bg-gray-300 dark:bg-gray-300 antialiased px-2 py-1 bg-opacity-50 border-[1px] border-gray-800"
              recoilAtom={signUpFields("username")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label
              htmlFor="email"
              className="w-full md:w-1/3 text-black dark:text-gray-300"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              classes="w-2/3 md:w-1/3 rounded-md bg-gray-300 dark:bg-gray-300 antialiased px-2 py-1 bg-opacity-50 border-[1px] border-gray-800"
              recoilAtom={signUpFields("email")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label
              htmlFor="password"
              className="w-full md:w-1/3 text-black dark:text-gray-300"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              classes="w-2/3 md:w-1/3 rounded-md bg-gray-300 dark:bg-gray-300 antialiased px-2 py-1 bg-opacity-50 border-[1px] border-gray-800"
              recoilAtom={signUpFields("password")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label
              htmlFor="file"
              className="w-full md:w-1/3 text-black dark:text-gray-300"
            >
              Picture
            </label>
            <input
              id="file"
              type="file"
              className="w-2/3 md:w-1/3 rounded-md bg-gray-300 dark:bg-gray-300 antialiased px-2 py-1 bg-opacity-50 border-[1px] border-gray-800"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              name="profilePicture"
            />
          </div>
          <button
            type="submit"
            className="w-2/3 md:w-1/3 mx-auto bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
          <hr className="my-6 mx-10 border-gray-500 border-[1px]" />
        <div className="flex justify-center items-center my-4">

          {/* <GoogleAuth /> */}
        </div>
        <p className="text-black dark:text-white text-center mt-4">
          {" "}
          Do You Have already an account? Then{" "}
          <Link
            className=" underline hover:text-blue-700 duration-200 transition-colors"
            to={"/Sign-in"}
          >
            Sign In
          </Link>{" "}
        </p>
      </div>
    </Index>
  );
}

export default Signup;
