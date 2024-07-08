import React from 'react';
import Index from '../Index';
import { OtpInput } from '../../../Components/OtpInput';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Otp = () => {
  const navigate=useNavigate()
  const path=useLocation()
  const params=new URLSearchParams(path.search);
  const encodedEmail=params.get('email');
  const decodedEmail=decodeURIComponent(encodedEmail)
  const onOtpSubmit =async (otp) => {

    const data = {
      otp,
      email: decodedEmail
    }
    const response = await axios.post('http://localhost:3000/api/v1/user/verifyOtp', data)
    if(response.status==200){
      alert(response.data.message);
      navigate(`/enter_newPassword?${createSearchParams({ userId:response.data.userId })}`)
    }
  };

  return (
    <Index>
      <div className="h-screen flex items-center justify-center mt-[-10%]">
        <div className="max-w-lg w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Enter OTP Here</h1>
          <div className="flex justify-center">
            <OtpInput onOtpSubmit={onOtpSubmit} />
          </div>
        </div>
      </div>
    </Index>
  );
};

export default Otp;
