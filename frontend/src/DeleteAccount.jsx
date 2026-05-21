import "./DeleteAccount.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {MyContext} from "./MyContext.jsx"

import {BACKEND_URL} from "./config.js";

function DeleteAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useContext(MyContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/auth/delete-account`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }

    setPassword("");
  };

  return (
    <div className="loginPage">
      <div className="loginCard">

        {/* Close button */}
        <button
          className="closeBtn"
          aria-label="Close"
          onClick={() => navigate("/app")}
        >
          ×
        </button>

        {/* Header */}
        <div className="loginHeader">
          <h1>Delete Account</h1>
          <p>
            {user?.authProvider === "google"
              ? "Are you sure you want to permanently delete your account?"
              : "Enter your password to permanently delete your account"}
          </p>
        </div>

        {/* Form */}
        <form className="loginForm" onSubmit={handleSubmit}>

          {user?.authProvider !== "google" && (
            <div className="fieldGroup">
              <label className="fieldLabel" htmlFor="password">Password</label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="fieldInput"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
          )}

          <button type="submit" className="continueBtn deleteBtn">
            Delete Account
          </button>

        </form>

      </div>
    </div>
  );
}

export default DeleteAccount;
