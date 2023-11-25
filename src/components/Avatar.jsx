import React from 'react'
import dummyUser from '../utils/dummyUser';

const Avatar = ({img,dim}) => {
  return (
    <div>
      <img
        className="rounded-circle"
        width={dim}
        height={dim}
        src={img||dummyUser.profilePic}
        alt="avatar"
      />
    </div>
  );
}

export default Avatar