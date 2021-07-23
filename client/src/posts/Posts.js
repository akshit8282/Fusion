import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
import office from '../images/office.jpg'
import akshit from '../images/akshit.jpeg'
function Posts({posts}) {
    
    return (
        <div className="posts">
{posts.map((p,i)=>{
    
 return <Post key={i} img={akshit} post={p}/> 
})}
          
           
        </div>
    )
}

export default Posts
