import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import {useState,useEffect} from 'react'
import "./singlepost.css";
import axios from 'axios'
import {Context} from '../context/context'
import {useContext} from 'react'
export default function SinglePost() {
  const {user}=useContext(Context);
  const [post, setpost] = useState({});
  const location=useLocation();
  const path=location.pathname.split('/')[2];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
  const fetch=async ()=>{
const post=await axios.get('/post/'+path);
setpost(post.data);
setTitle(post.data.title);
setDesc(post.data.desc);
  }
  fetch();
  }, [path])
//delete post
const handledelete = async () => {
  try {
    await axios.delete(`/post/${post._id}`, {
      data: { username: user.username },
    });
    window.location.replace("/");
  } catch (err) {}
};
//update
const handleUpdate = async () => {
  try {
    await axios.put(`/post/${post._id}`, {
      username: user.username,
      title,
      desc,
    });
    setUpdateMode(false)
    window.location.reload();
  } catch (err) {}
};
  const PF="http://localhost:5000/images/";
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="imgwrapper">
        <img
          className="singlePostImg"
          src={PF+post.photo}
          alt=""
        />
        </div>
       
        {updateMode?( <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />):
          <h1 className="singlePostTitle">
          {post.title}
         
{
  post.username==user?.username&&
  <div className="singlePostEdit">
     <i className="singlePostIcon far fa-edit" onClick={(e)=>{
       setUpdateMode(true)
     }}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handledelete}></i>
          </div>
}
           
        </h1>}
        <div className="singlePostInfo">
          <span>
            Author:
            <Link to={`/?user=${post.username}`}>
            <b className="singlePostAuthor">
             
                {post.username}
            </b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
         {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}