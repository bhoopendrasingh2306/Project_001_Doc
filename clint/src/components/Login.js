import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      if (await validateUser()) {
        navigate("/doc");
      }
    } catch (err) {
      setMessage(err.response.data.message);
      // navigate('/error', {state: {message: err.response.data.message}} )
    }
  };

  async function validateUser() {
    const url = "http://localhost:3002/login"; //path for connection to backend' login function

    const data = await axios.post(url, { username, password });
    const user = data && data.data;

    if (user && user.username) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      return true;
    }
    return false;
  }

  const signup = () => {
    navigate("/signup");
  };

  return (
    <div className="bg">
      <div className="login">
        <h1>Login :)</h1>
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
        <div style={{ color: "white" }}>
          Does not have any Account?
          <button className="login_btn" type="submit" onClick={signup}>
            SIGN UP
          </button>
        </div>
        <p style={{ color: "red" }}> {message} </p>
      </div>
    </div>
  );
};

export default Login;
