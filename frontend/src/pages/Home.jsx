import React, { useEffect } from 'react'
import ProfileSide from '../components/ProfileSide'
import FeedSide from '../components/FeedSide'
import TrendingTags from '../components/TrendingTags';

const Home = () => {

  return (
    <div className="home">
      <div  className="mobFirst1"> <ProfileSide /></div>
     
      <FeedSide />
      <TrendingTags/>
    </div>
  )
}

export default Home