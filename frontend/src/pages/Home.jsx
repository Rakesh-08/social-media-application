import React,{useState,useEffect} from 'react'
import ProfileSide from '../components/ProfileSide'
import FeedSide from '../components/FeedSide'
import TrendingTags from '../components/TrendingTags';
import dummyUser from "../utils/dummyUser";


const Home = () => {
  let [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("pgmToken")) {
      setUser(JSON.parse(localStorage.getItem("authInfo")));
    } else {
      setUser(dummyUser)
    }
  }, [localStorage.getItem("authInfo")]);

  return (
    <div className="home">
      <div  className="mobFirst1"> <ProfileSide user={user} /></div>
     
      <FeedSide user={user}  />
      <TrendingTags/>
    </div>
  )
}

export default Home