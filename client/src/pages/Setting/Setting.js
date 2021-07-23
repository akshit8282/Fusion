import React from 'react'
import Sidebar from '../../sidebar/Sidebar'
import office from '../../images/office.jpg'
import './Setting.css'
import { useContext, useState } from "react";
import { Context } from "../../context/context";
import axios from "axios";
export default function Setting() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
 

  const { user, dispatch } = useContext(Context);
  const [response, setResponse] = useState(user);
  const PF = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    console.log(user._id);
    const updatedUser = {
      userid: user._id,
      username,
      email,
      password,
    };
    
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put("/user/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  
     
  };
    return (
        <div className="Wrapper">
            <div className="row">
<div className="col-8">
<div className="pp container">
<img  src={file ? URL.createObjectURL(file) : PF+user.profilePicture} className="img-fluid settingimg" />
<label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
</div>
<form className="container" onSubmit={handleSubmit}>
<div className="form-group">
    
    <label>UserName</label>
    <input type="text" className="in form-control" id="username" placeholder="Enter username"
     onChange={(e) => setUsername(e.target.value)}
    />
  </div>
  <div class="form-group">
    <label>Email address</label>
    <input type="email" className="in form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
     onChange={(e) => setEmail(e.target.value)}
    />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label >Password</label>
    <input type="password" className="in form-control" id="exampleInputPassword1" placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}/>
  </div>
  
  <button type="submit" className="settingsSubmitButton btn btn-primary">Update</button>
  {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
</form>

</div>
<div className="col-4">
<Sidebar/>


</div>
            </div>
        </div>
    )
}
