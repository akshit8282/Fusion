import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Topbar.css'

import { useContext } from "react";
import { Context } from "../context/context";
export default function Topbar() {
  const PF = "http://localhost:5000/images/"
      const { user,dispatch } = useContext(Context);
      const handleLogout=()=>{
dispatch({type:'LOGOUT'})
      }
        return (
            <div className="topbar container-fluid">
                <div className="topleft">
<i className="fonticon fab fa-facebook-square"></i>
<i className="fonticon fab fa-twitter-square"></i>
<i className="fonticon fab fa-pinterest-square"></i>
</div>
                <div className="topcenter">
<ul className="list">
<li className="l-item"><Link className="link" to="/">
              HOME
            </Link></li>
<li className="l-item"><Link className="link" to="/write">
              WRITE
            </Link></li>
            {user && <li className="l-item" onClick={handleLogout}>LOGOUT</li>}

</ul>

                </div>




                <div className="topright">
                {user ? (
          <Link className="link" to="/settings">
           
              <img className="image" src={PF+user.profilePicture} alt="image"/>
             
          </Link>
        ) : (
          <ul className="list">
            <li className="l-item">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="l-item">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
                   
                </div>
            </div>
        )
    }



