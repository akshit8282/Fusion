import { Link } from "react-router-dom";
import {useState,useEffect} from 'react'
import "./Sidebar.css";
import axios from 'axios'

export default function Sidebar() {
  const [cat, setcat] = useState([]);
  useEffect(() => {
   const cat=async ()=>{
     const category=await axios.get('/category');
     setcat(category.data);
   }
   cat();
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle cat">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map(c=>{
            
           return <li key={c._id} className="sidebarListItem">{c.name}</li>
})}
         
         
           
        
          
        
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}