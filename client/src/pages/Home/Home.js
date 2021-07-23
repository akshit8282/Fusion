import {useState,useEffect} from 'react'
import Header from '../../Header/Header'
import Sidebar from '../../sidebar/Sidebar'
import Posts from '../../posts/Posts'
import './home.css';
import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

export default function Home() {
const [posts, setposts] = useState([]);
const {search}= useLocation();
console.log(search)
useEffect(() => {
    const fetchpost=async ()=>{
 const posts=await  axios.get('/post'+search, {headers: {'Access-Control-Allow-Origin': '*'},
    });
    setposts(posts.data);
    }
    fetchpost();
   
}, [search])

    return (
        <div className="home1">
<Header/>


               <div className="home container-fluid">
<Posts posts={posts}/>
<Sidebar/>

               </div>
            </div>
    )
}




