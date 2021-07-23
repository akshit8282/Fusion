import React from 'react'
import './Login.css';
import axios from "axios";
import { useContext, useRef ,useState} from "react";
import { Context } from "../../context/context";

export default function Login() {
  const [err,seterr]=useState("");
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    seterr("");
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res.data)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      if(err.response.status===400){
seterr('CHECK USERNAME OR PASSWORD!!');
      }
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
    return (
        <div className="container-fluid login">
            <form onSubmit={handleSubmit}  enctype="multipart/form-data">

  <div className="form-group">
    <label className='loginlabel'>UserName</label>
    <input type="text" className=" form-control" id="username"  placeholder="Enter Username"
      ref={userRef}
    />

  </div>
  <div class="form-group">
    <label className='loginlabel'>Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
     ref={passwordRef}/>
  </div>
  
  <button type="submit" id="login-button" className="settingsSubmitButton button btn btn-primary" disabled={isFetching}>Login</button>
  <h5 style={{color:'red',fontFamily:'cursive',margin:'10px',marginLeft:'24px'}}>{err==""?"":err}</h5>
</form>
<button type="submit" className=" registerbutton btn btn-primary">Register</button>
        </div>
    )
}
