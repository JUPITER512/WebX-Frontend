import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export const OtpInput = ({ onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefArr = useRef([]);
  useEffect(() => {
    if (inputRefArr.current[0]) {
      inputRefArr.current[0].focus();
    }
  }, []);
  const handleChange = (e, index) => {
    if (!e.target.value) return;
    const value = e.target.value;
    const newotp = [...otp];
    newotp[index] = value[value.length - 1];
    setOtp(newotp);
    if (e.target.value.length === 1 && index < otp.length - 1) {
      inputRefArr.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && index >= 0 && otp[index] != "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index != 0) {
        inputRefArr.current[index - 1].focus();
      }
    }
    if (e.keyCode === 39 && index < otp.length - 1) {
      inputRefArr.current[index + 1].focus();
    }
    if (e.keyCode === 37 && index > 0) {
      inputRefArr.current[index - 1].focus();
    }
  };
  const handleOtpSubmit = () => {
    onOtpSubmit(otp.join(""));
      setOtp(new Array(6).fill(""))

  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>
          {otp.map((_, index) => {
            return (
              <input
                ref={(element) => (inputRefArr.current[index] = element)}
                type="text"
                key={index}
                value={otp[index]}
                onChange={(e) => {
                  handleChange(e, index);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, index);
                }}
                className="border-[1px] w-[40px] h-[40px] text-center mx-1 bg-gray-100 text-black dark:bg-gray-500 dark:text-white"
              />
            );
          })}
        </div>
        <button
          className=" my-2 bg-gray-100  dark:bg-gray-500 dark:text-gray-50  p-2 rounded-md w-1/4 "
          onClick={() => {
            handleOtpSubmit();
          }}
        >
          Submit Otp
        </button>
      </div>
    </>
  );
};
