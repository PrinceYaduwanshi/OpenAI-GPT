import "./SignupForm.css";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {MyContext} from "./MyContext.jsx";


import {BACKEND_URL} from "./config.js"

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const{user, setUser}= useContext(MyContext);
  const [formData, setFormData]= useState({
    name:"",
    email:"",
    username:"",
    password:"",
    confirmPassword:"",
  })

  const handleSubmit= async(event)=>{
    event.preventDefault();
    // console.log(formData);

    let response= await fetch(`${BACKEND_URL}/auth/signup`,{
      method: "POST",

      headers:{
        "Content-Type": "application/json"
      },

      credentials:"include",

      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
    })

    let rep= await response.json();
    // console.log(rep);
    
    setUser(rep.newUser);
    // console.log(user);
    
    setFormData({
      name:"",
      email:"",
      username:"",
      password:"",
      confirmPassword:"",
    })

    if(rep.success){
      navigate("/app");
    }else{
      navigate("/signup");
    };
  }

  const handleInputChange= (event)=>{
    let fieldName = event.target.name;
    let fieldVal = event.target.value;

    // console.log(fieldName, fieldVal);
    setFormData((currData)=>{
      return { ...currData, [fieldName]:fieldVal};
    })
  }

  const handleGoogleLogin= async()=>{
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
          <h1>Create account</h1>
          <p>Sign up to get started with GPT</p>
        </div>

        {/* Signup form */}
        <form className="loginForm" onSubmit={handleSubmit}>

          <div className="fieldGroup">
            <label className="fieldLabel" htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="fieldInput"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="fieldGroup">
            <label className="fieldLabel" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="fieldInput"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="fieldGroup">
            <label className="fieldLabel" htmlFor="username">username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="fieldInput"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>


          <div className="fieldGroup">
            <label className="fieldLabel" htmlFor="password">Password</label>
            <div className="passwordWrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="fieldInput"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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

          <div className="fieldGroup">
            <label className="fieldLabel" htmlFor="confirmPassword">Confirm Password</label>
            <div className="passwordWrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat your password"
                className="fieldInput"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="eyeBtn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
          </div>

          <button type="submit" className="continueBtn">
            Sign up
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

        {/* Login prompt */}
        <p className="registerPrompt">
          Already have an account?&nbsp;
          <a href="/login" className="registerLink">Log in</a>
        </p>

      </div>
    </div>
  );
}

export default SignupForm;
