import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/doc");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitValidation();
  };

  const submitValidation = async () => {
    try {
      if (await signUp()) {
        navigate("/");
      }
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const PORT= process.env.PORT || 4000;;
  async function signUp() {
    const url = `http://localhost:${PORT}/signup`;    //path for connection to backend' signup function

    const data = await axios.post(url, { username, password });

    const user = data && data.data;
    return !!(user && user.username);
  }

  function login() {
    navigate("/");
  }

  return (
    <div className="bg">
      <div className="login">
        <div className="heading">
          <h1>Signup :) </h1>
        </div>
        <div>
          <input
            className="login_input"
            type="username"
            onChange={(e) => setusername(e.target.value)}
            placeholder="username"
          ></input>
          <input
            className="login_input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          ></input>
          <button className="submit_btn" type="submit" onClick={handleSubmit}>
            SUBMIT
          </button>
          <div style={{ color: "white", padding: "2px" }}>
            Already have an account?
            <button className="login_btn" type="submit" onClick={login}>
              LOGIN
            </button>
          </div>
          <p style={{ color: "red" }}> {message} </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
