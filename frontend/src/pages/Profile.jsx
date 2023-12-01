import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import TrendingTags from '../components/TrendingTags';
import FeedSide from "../components/FeedSide"
import ProfileRightSide from '../components/ProfileRightSide';
import ProfileCard from '../components/ProfileCard';
import InfoDetails from '../components/InfoDetails';
import { getUser } from "../apiCalls/usersApi";
import dummyUser from "../utils/dummyUser"



const Profile = () => {
  let id= useSelector(state=>state.utilReducer.profileId)
  let [user, setUser] = useState({})

  useEffect(() => {
    if (localStorage.getItem("pgmToken") && id) {
     
      let loggedUser = JSON.parse(localStorage.getItem("authInfo"));
      if (loggedUser._id !== id) {
         getUserDetail();
      } else {
        setUser(loggedUser)
      }
     
    } else {
      setUser(dummyUser)
    }
  }, [id,localStorage.getItem("authInfo")])


  let getUserDetail = () => {
     getUser(id)
       .then((res) => {
         setUser(res.data)
         
       })
       .catch((err) => {
         console.log(err);
       });
  }
  


  return (
      <div className="profilePage">
          <TrendingTags />
          
          <div>
              <ProfileCard data={{
                  profile:true,
                  coverPhotoHeight: 220,
                  dim:130
        }} user={user} />
        
        <InfoDetails user={user} width="90%"/>
               <FeedSide profile={true} user={user} />
          </div>
         
      <ProfileRightSide user={user} />
    </div>
  )
}

export default Profile