import React,{useEffect} from 'react'
import TrendingTags from '../components/TrendingTags';
import FeedSide from "../components/FeedSide"
import ProfileRightSide from '../components/ProfileRightSide';
import ProfileCard from '../components/ProfileCard';
import InfoDetails from '../components/InfoDetails';

const Profile = () => {

  useEffect(() => {
    
  },[])
  return (
      <div className="profilePage">
          <TrendingTags />
          
          <div>
              <ProfileCard data={{
                  profile:true,
                  coverPhotoHeight: 220,
                  dim:130
        }} />
        
          <InfoDetails width="90%"/>
               <FeedSide profile={true} />
          </div>
         
           <ProfileRightSide/>
    </div>
  )
}

export default Profile