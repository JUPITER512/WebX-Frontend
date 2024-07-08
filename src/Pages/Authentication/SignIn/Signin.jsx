import React, { useState } from "react";
import Index from "../Index.jsx";
import Input from '../../../Components/Input.jsx';
import { signInFields } from "../../../app/store.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useRecoilState(signInFields('email'));
  const [password, setPassword] = useRecoilState(signInFields('password'));
  const [userName, setusername] = useRecoilState(signInFields('username'));
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data={
        email,
        password,
        userName
      }
      const response = await axios.post('http://localhost:3000/api/v1/user/signIn', data );
      if (response.status == 200) {
        console.log(response.data)
        setEmail('');
        setPassword('');
        setusername('');
        Object.entries(response.data.data.user).map(([key, value], index) => {
          localStorage.setItem(key,value)
        })
        localStorage.setItem('accessToken', response.data.data.accessToken)
        navigate('/profile')
      }
     
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
      // Handle error state or display error to the user
    }
  };

  // const handleGoogleSignup = () => {
  //   console.log("Signing up with Google...");
  // };
  return (
    <Index>
      <div className="border-[1px] border-gray-500 rounded-lg dark:border-gray-300 w-full lg:w-1/2 bg-white dark:bg-gray-800  m-auto min-h-[40rem] px-8 py-10 font-Playwrite shadow-[0_0px_20px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0px_20px_20px_rgba(255,255,255,0.1)]">
        <h1 className="text-center my-4 font-semibold text-2xl dark:text-white text-black">Sign in Here</h1>

        {/* Google Signup Button */}
        {/* <div className="flex justify-center">
          <button
            onClick={handleGoogleSignup}
            className="w-2/3 md:w-1/3 mx-auto bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-500 transition-colors duration-200"
          >
            Sign in with Google
          </button>
        </div> */}

        <hr className="my-6 mx-10 border-gray-500 border-[1px]" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-center">
         
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label htmlFor="username" className="w-full md:w-1/3 text-black dark:text-gray-300">Username</label>
            <Input id="username" classes="w-2/3 md:w-1/3 rounded-md bg-gray-300 dark:bg-gray-300 antialiased px-2 py-1 bg-opacity-50 border-[1px] border-gray-800" recoilAtom={signInFields('username')} />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label htmlFor="email" className="w-full md:w-1/3 text-black dark:text-gray-300">Email</label>
            <Input id="email" type="email" classes="w-2/3 md:w-1/3 rounded-md bg-gray-300 dark:bg-gray-300 antialiased px-2 py-1 bg-opacity-50 border-[1px] border-gray-800" recoilAtom={signInFields('email')} />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label htmlFor="password" className="w-full md:w-1/3 text-black dark:text-gray-300">Password</label>
            <Input id="password" type="password" classes="w-2/3 md:w-1/3 rounded-md bg-gray-300 dark:bg-gray-300 antialiased px-2 py-1 bg-opacity-50 border-[1px] border-gray-800" recoilAtom={signInFields('password')} />
          </div>
      
          <button type="submit" className="w-2/3 md:w-1/3 mx-auto bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-500 transition-colors duration-200">
            Login
          </button>
        </form>
        <p className="text-black dark:text-white text-center mt-4">You Dont't Have an account? Then <Link className=" underline hover:text-blue-700 duration-200 transition-colors" to={'/Sign-up'}>Sign Up</Link> </p>
        <p className="text-black dark:text-white text-center mt-4">Or</p>
        <p className="text-black dark:text-white text-center mt-4">Do you forget your password? Then <Link className=" underline hover:text-blue-700 duration-200 transition-colors" to={'/Forget-Password'}>Reset Password</Link> </p>
      </div>
    </Index>
  )
}

export default Signin