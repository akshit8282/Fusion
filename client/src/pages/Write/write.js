import React from 'react'
import './Write.css'
import {useEffect,useState,useContext} from 'react'
import {Context} from '../../context/context'
import axios from 'axios';

export default function Write() {
 
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
const handleSubmit=async (e)=>{
e.preventDefault();
const forminput={
 
  title,
  desc,
  username:user.username,
}
let data;
if(file){
 data=new FormData();
  const filename=Date.now()+file.name;
  data.append("name",filename);
  data.append("file",file);
  forminput.photo=filename
}
try{

await axios.post('/upload',data);
}catch(e){
console.log(e);
}
const post=await axios.post('/post',forminput);
window.location.replace('/post/'+post.data._id)
console.log(post);
}
    return (
        <div className="write">
            <div className="imagediv">
              {file&&
               <img
               className="writeImg"
               src={URL.createObjectURL(file)}
               alt=""
             />}
              
      </div>
      <div style={{height:'60px'}}></div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
     <form onSubmit={handleSubmit}>

  <div class="form-group row">
  <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={e=>{
                setFile(e.target.files[0]);
              }}
            />
    <div class="col-sm-10">
      <input type="text" style={{width:'56vw',height:'7vh'}} class="form-control form-control-sm" className="writeInput writeText"  autoFocus={true}  placeholder="Title..."
       onChange={e=>{
        settitle(e.target.value)
      }}
      />
    </div>
   
   
  </div>
  
  <div class="form-group">
   
    <textarea placeholder="Add your Story..."
    class="form-control" style={{width:'56vw'}}  className="writeInput" rows="3"
    onChange={e=>{
      setdesc(e.target.value)
    }}
    ></textarea>
  </div>
  <button className="writeSubmit" type="submit">
          Publish
        </button>
</form>

</div>
        </div>
        
    )
}
