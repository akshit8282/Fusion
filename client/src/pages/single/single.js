import Sidebar from '../../sidebar/Sidebar'
import SinglePost from '../../singlepost/singlepost'
import "./single.css";

export default function Single() {
  return (
    <div className="single">
        
      <SinglePost />
      
      
      <Sidebar />
    </div>
  );
}