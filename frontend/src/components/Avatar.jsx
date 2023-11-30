import React from 'react'
import dummyUser from '../utils/dummyUser';

const Avatar = ({ img, dim }) => {
 
  return (
    <div>
      <img
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