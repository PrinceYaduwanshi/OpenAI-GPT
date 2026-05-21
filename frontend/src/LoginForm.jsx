import "./LoginForm.css";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm.jsx";

import {MyContext} from "./MyContext.jsx";
import { BACKEND_URL } from "./config";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {setUser}= useContext(MyContext);
  const [formData, setFormData]= useState({
    username:"",
    password:""
  })

  const showSignUp= ()=>{
    navigate("/signup");
  }

  const handleSubmit= async (event)=>{
    event.preventDefault();
    // console.log(formData);

    const options={
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    }
    const response= await fetch(`${BACKEND_URL}/auth/login`, options);
    const rep= await response.json();
    
    // console.log(rep);
    setUser(rep.user);

    if(rep.success){
      navigate("/app");
    }else{
      alert(rep.message);
    }

    setFormData({
      username:"",
      password:""
    })
  }

  const handleInputChange= (event)=>{
    let fieldName = event.target.name;
    let fieldVal = event.target.value;

    setFormData((currData)=>{
      return { ...currData, [fieldName]:fieldVal};
    })
  }

  const handleGoogleLogin= ()=>{
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  }

  return (
    <div className="loginPage">
      <div className="loginCard">

        {/* Close button */}
        <button
          className="closeBtn"
          aria-label="Close"
          onClick={() => navigate("/dashboard")}
        >
          ×
        </button>

        {/* Header */}
        <div className="loginHeader">
          <h1>Welcome back</h1>
          <p>Sign in to continue to GPT</p>
        </div>

        {/* Credentials form */}
        <form className="loginForm" onSubmit={handleSubmit}>

          <div className="fieldGroup">
            <label className="fieldLabel" htmlFor="username">username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="fieldInput"
              id="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </div>

          <div className="fieldGroup">
            <label className="fieldLabel" htmlFor="password">Password</label>
            <div className="passwordWrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="fieldInput"
                id="password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
              />
              <button
                type="button"
                className="eyeBtn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
          </div>

          <button type="submit" className="continueBtn">
            Log in
          </button>

        </form>

        {/* OAuth divider */}
        <div className="divider">
          <span></span>
          OR
          <span></span>
        </div>

        {/* Google sign-in */}
        <button className="loginBtn" onClick={handleGoogleLogin}>
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Register prompt */}
        <p className="registerPrompt">
          Don&apos;t have an account?&nbsp;
          <button
            type="button"
            className="registerLink registerLinkBtn"
            onClick={showSignUp}
          >
            Sign up
          </button>
        </p>

      </div>
    </div>
  );
}

export default LoginForm;
