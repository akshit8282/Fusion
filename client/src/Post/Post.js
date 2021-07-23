import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({img,post}) {
  const PF="http://localhost:5000/images/";
  console.log(post);
  return (
    <div className="post">
      {post.photo&&(<img
        className="postImg"
        src={PF+post.photo}
        alt=""
      />)}
      
      <div className="postInfo">
        <div className="postCats">
          {post.category.map(c=>{
            <span className="postCat">
            
           {c.name}
         
        </span>
          })}
          
         
        </div>
        <Link to={`/post/${post._id}`} className="link">
        <span className="postTitle">
        
           {post.title}
         
        </span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
       {post.desc}
      </p>
    </div>
  );
}