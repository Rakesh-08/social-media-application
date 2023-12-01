import React from 'react'
import dummyUser from '../utils/dummyUser';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Avatar = ({ img, dim,userId }) => {
  let dispatch = useDispatch();
  let NavigateTo = useNavigate();


  let showProfile = () => {  
    dispatch({
      type: "otherProfile",
      userId: userId
    });
    
    NavigateTo("/profile")

  }
 
  return (
    <div>
      <img
        onClick={showProfile}
        className="rounded-circle"
        width={dim}
        height={dim}
        src={img||dummyUser.profilePic}
        alt="avatar"
        onError={(e)=>e.target.src=dummyUser.profilePic}
      />
    </div>
  );
}

export default Avatar