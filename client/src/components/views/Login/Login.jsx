import { useEffect, useState } from "react";
import axios from "axios";

import { Link,useNavigate} from "react-router-dom";
import styles from "./Login.css";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const navigator=useNavigate();
  
  useEffect( ()=>{
    if (localStorage.getItem("authToken")){
        navigator("/")
    }
  },[navigator])

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("authToken", data.token);
	    navigator("/")
    } catch (error) {
		console.log(error)
		setError(error.message);
		setTimeout(() => {
			setError("");
		}, 10000);
	}
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: 
          <Link to="/forgotpassword" className="login-screen__forgotpassword" tabIndex={4}>
            Forgot Password?
          </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" tabIndex={3}>
            Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
