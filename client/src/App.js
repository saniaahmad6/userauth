import {Routes, Route} from "react-router-dom"


import PrivateRoute from "./components/routes/PrivateRoute";

import PrivateView from "./components/views/Pages/PrivateView"
import Login from "./components/views/Login/Login"
import Signup from "./components/views/Signup/Signup"
import ForgotPassword from "./components/views/ForgotPassword/ForgotPassword"
import ResetPassword from "./components/views/ResetPassword/ResetPassword"
import { Sign } from "crypto";
const App =() => {
  return (
    
      <div>
        <div className="app">
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup/>} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/passwordreset/:resetToken" element={<ResetPassword />} />
        </Routes>
      </div>
      </div>
    
  );
}

export default App;
