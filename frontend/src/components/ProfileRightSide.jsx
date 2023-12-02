import React from 'react'

import FollowersCard from './FollowersCard'
import InfoDetails from './InfoDetails'

const ProfileRightSide = ({user}) => {
  return (
    <div>
      <InfoDetails user={user} />
      <FollowersCard
        userIdForFollower={user?._id}
        query="following"
        sliced={2}
        heading="who is following you"
      />
    </div>
  );
}

export default ProfileRightSide