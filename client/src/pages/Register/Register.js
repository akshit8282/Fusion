import React from 'react'
import './register.css';
import {useState} from 'react'
import axios from 'axios';
export default function Register() {

const [username,setusername]=useState("");
const [email,setemail]=useState("");
const [password,setpassword]=useState("");
const [error,seterror]=useState("");
const handlesubmit=async (e)=>{
  e.preventDefault();
  seterror('');
const user=await axios.post('/auth/register',{
  username,
  email,
  password
}).then(res=>{
  window.location.replace('/login')
}).catch(err=>{
  if(err.response.status===400){
    window.location.replace('/login')
  }
  if(err.response.status==500){
    seterror('Try changing username or email');
  }
  
 
})

}
    return (
        <div className="container-fluid register">
            <form onSubmit={handlesubmit}>

  <div className="form-group">
  <div class="form-group">
    <label className='loginlabel'>Username</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="UserName"
     onChange={e=>{
      setusername(e.target.value);
     }}
    />
  </div>
    <label className='loginlabel'>Email address</label>
    <input type="email" className=" form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
   onChange={e=>{
     setemail(e.target.value);
    }}
    />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label className='loginlabel'>Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
     onChange={e=>{
      setpassword(e.target.value);
     }}
    />
  </div>
  
  <button type="submit" className="settingsSubmitButton button btn btn-primary">Register</button>
  <h2 style={{marginLeft:'30px'}}>{error==''?'':error}</h2>
</form>
<button type="submit" className=" registerbutton btn btn-primary">Login</button>
        </div>
    )
}
