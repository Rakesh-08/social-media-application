import React from "react";

import FollowersCard from "./FollowersCard";
import ProfileCard from "./ProfileCard";



const ProfileSide = () => {
  return (
    <div style={{position:"sticky",top:"11%"}} className="m-3  px-2 " >
       <ProfileCard/>
      <FollowersCard query="followers" heading="who is following you" sliced={2}  />
     
    </div>
  );
};

export default ProfileSide;
