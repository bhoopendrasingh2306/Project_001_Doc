import "../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io('http://localhost:3000');

function MyComponent() {
  const [value, setValue] = useState("");
  const [filename, setFilename] = useState("");
  const [message, setMessage] = useState("");
  const [isType, setIsType] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

                                                                                         // console.log("location", name);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    if (name) {
      getDoc();
    }
  }, []);

  useEffect(() => {
    if (isType) {
      save();
    }
  }, [isType]);

  function getTopic(event) {
    return `doc_${event._id}`;
  }
  const PORT=3000;
  async function getDoc() {
    try {
      const url = `http://localhost:${PORT}/doc/details/${name}`;

      const data = await axios.get(url, {
        headers: { token: localStorage.getItem("token") },
      });
      const doc = data && data.data;
      if (doc) {
        setValue(doc.text);
        setFilename(doc.name);

        socket.on(getTopic(doc), (msg) => {
          setValue(msg.text);
        });
      }
      console.log("doc---->", doc);
    } catch (err) {
      setMessage(err.response.data.message);
      navigate("/");
    }
  }

  function setText(val) {
    setValue(val);
    setIsType(!isType);
  }

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  function save() {
    if (!filename) {
      setMessage("File name Required");
    } else {
      saveDoc();
    }
  }

  async function saveDoc() {
    try {
      const url = `http://localhost:${PORT}/doc/add`;

      const data = await axios.post(
        url,
        { name: filename, text: value },
        { headers: { token: localStorage.getItem("token") } }
      );
      // const user = data && data.data;
      setMessage("Saved Successfully");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  }

  function newdoc() {
    setFilename("");
    setValue("");
    setMessage("");
    setIsType(true);
    navigate("/doc");
  }

  return (
    <div>
      <p style={{ color: "red" }}>{message}</p>

      <div>
        <div className="head_div">
          <div className="filename_div">
            <input
              type="username"
              className="input_box"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="enter file name"
              readOnly={name ? true : false}
              style={{ borderRadius: "16px", "padding-left": "20px" }}
            ></input>
            <button type="submit" className="button-9" onClick={save}>
              Save
            </button>
            <button type="submit" className="button-9" onClick={newdoc}>
              New
            </button>
          </div>
          <div className="search_div">
            <input
              type="username"
              className="input_box"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="search file name"
              style={{ borderRadius: "16px", "padding-left": "20px" }}
            ></input>
            <button type="submit" className="button-9" onClick={getDoc}>
              Search
            </button>
          </div>
          <button type="submit" className="button-9" onClick={logout}>
            Log Out
          </button>
        </div>

        <hr></hr>
        <div>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setText}
            tabIndex={10}
            style={{ height: "30em" }}
          />
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
