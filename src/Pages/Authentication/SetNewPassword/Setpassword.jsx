import { useLocation, useNavigate } from "react-router-dom";
import Index from "../Index";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

function Setpassword() {
  const navigate=useNavigate();
  const [password, setPassword] = useState(new Array(2).fill(""));
  const [visible, setvisible] = useState(new Array(2).fill(""));
  const path = useLocation();
  const params = new URLSearchParams(path.search);
  const userId = params.get("userId");

  function handleChange(e, index) {
    const newPass = [...password];
    newPass[index] = e.target.value;
    setPassword(newPass);
  }
  function handlePasswordHideShow(index) {
    const newVisible = [...visible];
    newVisible[index] = !newVisible[index];
    setvisible(newVisible);
  }
  const handleSubmit = async () => {
    if (password[0] !== password[1]) return;
    const data={
        userId,
        newPassword:password[0]
    }
      const response = await axios.post('http://localhost:3000/api/v1/user/submitNewPassword',data)
    if(response.status==200){
        setPassword(new Array(2).fill(""))
        setvisible(new Array(2).fill(""))
        navigate('/sign-in')
    }
  };
  return (
    <Index>
      <div className="h-screen flex items-center justify-center ">
        <div className="max-w-lg w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-[-100%] md:mt-[-60%] lg:mt-[-20%]">
          <h1 className="text-center text-xl font-semibold  dark:text-gray-200 mb-4">
            Set New Password Here
          </h1>
          <div className="flex justify-center space-x-4">
            <div className="flex flex-col gap-4">
              {password.map((value, index) => (
                <div key={index} className="flex items-center gap-4">
                  <label className="text-gray-700 dark:text-gray-300 w-32">
                    {index === 0 ? "New Password" : "Confirm Password"}
                  </label>
                      <div className="flex-1 border-2 border-gray-300 dark:bg-gray-500 dark:text-white  dark:border-gray-600 h-10 p-2 rounded-lg flex items-center justify-center">
                    <input
                      type={`${visible[index] ? "text" : "password"}`}
                      value={value}
                      onChange={(e) => handleChange(e, index)}
                      placeholder={
                        index === 0 ? "New Password" : "Confirm Password"
                      }
                              className=" outline-none dark:bg-gray-500 dark:text-white"
                    />
                    <FontAwesomeIcon
                      icon={visible[index] ? faEyeSlash : faEye}
                      onClick={() => {
                        handlePasswordHideShow(index);
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              ))}
                          <button onClick={handleSubmit} className="bg-gray-500 text-gray-100 dark:bg-gray-100 dark:text-gray-500 py-1 rounded-lg hover:opacity-60">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </Index>
  );
}

export default Setpassword;
