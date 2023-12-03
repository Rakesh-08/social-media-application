import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import SinglePost from './SinglePost';
import { getTimelinePost } from '../apiCalls/postsApi';
import { postData } from '../utils/PostsData';


const PostContainer = ({refetchPost,setRefetchPost,profile,user}) => {
  let [posts, setPosts] = useState([]);

  let search = useSelector(state => state.utilReducer.searchTerm);
  let state = useSelector((state) => state.authReducers);
   
  useEffect(() => {
    if (localStorage.getItem('pgmToken') && user._id) {
      fetchPosts();
    }  

  }, [refetchPost,user,localStorage.getItem('pgmToken')]);
 


  let fetchPosts = () => {
    let q = profile ? "own" : "";

  getTimelinePost(q,user._id)
    .then((res) => {
      setPosts(res.data);
      state.fetch();
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
    <div className="shadow rounded">

      {posts.filter((post) => post.desc.includes(search)).map((post) => (
          <SinglePost
            key={post._id}
            data={post}
            setRefetchPost={setRefetchPost}
          />
        ))}
      {(!profile||!user._id) &&
        postData.filter((post) => {
         return post.desc.includes(search);
        }).map((post, index) => <SinglePost key={index} data={post} />)}
    </div>
  );
}

export default PostContainer