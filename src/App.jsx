import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Signin from "./Pages/Authentication/SignIn/Signin";
import Signup from "./Pages/Authentication/SignUp/Signup";
import ForgetPassword from "./Pages/Authentication/ForgetPassword/ForgetPassword";
import Otp from "./Pages/Authentication/Otp/Otp";
import Setpassword from "./Pages/Authentication/SetNewPassword/Setpassword";
import {Usersettings} from "./Pages/Usersettings.jsx/Usersettings";
import Layout from './layout';
import Chats from "./Pages/Chats/Chats";
import Home from "./Pages/Home/Home";

const App = () => {
  return (     
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/enter_newpassword" element={<Setpassword />} />
            <Route path="/" element={<Layout />}>
              <Route path="user-settings" element={<Usersettings />} />
              <Route path="chats" element={<Chats />} />
              <Route path="home" element={<Home />} />
            {/* <Route path="profile" element={<Chats />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    
  );
};

export default App;
