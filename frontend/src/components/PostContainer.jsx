import React,{useState,useEffect} from 'react';
import SinglePost from './SinglePost';
import { getTimelinePost } from '../apiCalls/postsApi';



const PostContainer = ({refetchPost,profile}) => {
  let [posts, setPosts] = useState([]);

useEffect(() => {
  fetchPosts();
 
}, [refetchPost]);

  let fetchPosts = () => {
  let q= profile?"own":""
  getTimelinePost( q)
    .then((res) => {
      
       setPosts(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
};

  return (
      <div className=" rounded">
          {posts.map((post, index) => 
              <SinglePost key={index} data={post} />
          )}
    </div>
  )
}

export default PostContainer