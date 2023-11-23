import React from "react";

import FollowersCard from "./FollowersCard";
import ProfileCard from "./ProfileCard";



const ProfileSide = () => {
  return (
    <div style={{position:"sticky",top:"11%"}} className="m-3  px-2 " >
       <ProfileCard/>
      <FollowersCard  />
     
    </div>
  );
};

export default ProfileSide;
