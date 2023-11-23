import React from 'react'

const Avatar = ({img,dim}) => {
  return (
    <div>
      <img
        className="rounded-circle"
        width={dim}
        height={dim}
        src={img}
        alt="avatar"
      />
    </div>
  );
}

export default Avatar