import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import SinglePost from './SinglePost';
import { getTimelinePost } from '../apiCalls/postsApi';
import { postData } from '../utils/PostsData';


const PostContainer = ({refetchPost,setRefetchPost,profile}) => {
  let [posts, setPosts] = useState([]);
   
  useEffect(() => {

    if (localStorage.getItem('pgmToken')) {
      fetchPosts();
    }
    
    
}, [refetchPost]);

  let fetchPosts = () => {
    let q = profile ? "own" : "";

  getTimelinePost( q)
    .then((res) => {
       setPosts(res.data)
    })
    .catch((err) => {
      if (err.response?.data?.message == "Token expired") {
        localStorage.clear();
        NavigateTo("/Auth/login")
       }
      console.log(err);
    });
};

  return (
      <div className=" rounded">
          {posts.map((post) => 
              <SinglePost key={post._id} data={post} setRefetchPost={setRefetchPost} />
      )}
      {!profile&&postData.map((post, index) =>
        <SinglePost key={index} data={post}  />)}
    </div>
  )
}

export default PostContainer