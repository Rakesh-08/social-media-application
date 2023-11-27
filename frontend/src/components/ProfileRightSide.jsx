import React from 'react'

import FollowersCard from './FollowersCard'
import InfoDetails from './InfoDetails'

const ProfileRightSide = () => {
  return (
      <div>
         <InfoDetails/>
      <FollowersCard query="followers" sliced={2} heading="who is following you" />
          
    </div>
  )
}

export default ProfileRightSide