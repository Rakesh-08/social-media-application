import React from 'react'
import TrendingTags from '../components/TrendingTags';
import FeedSide from "../components/FeedSide"
import ProfileRightSide from '../components/ProfileRightSide';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
  return (
      <div className="profilePage">
          <TrendingTags />
          
          <div>
              <ProfileCard data={{
                  profile:true,
                  coverPhotoHeight: 220,
                  dim:130
              }} />
               <FeedSide profile={true} />
          </div>
         
           <ProfileRightSide/>
    </div>
  )
}

export default Profile