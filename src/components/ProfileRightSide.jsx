import React from 'react'

import FollowersCard from './FollowersCard'
import InfoDetails from './InfoDetails'

const ProfileRightSide = () => {
  return (
      <div>
         <InfoDetails/>
      <FollowersCard profile={true} />
          
    </div>
  )
}

export default ProfileRightSide