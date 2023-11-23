import React from 'react';
import { posts } from '../utils/PostsData';
import SinglePost from './SinglePost';

const PostContainer = () => {
  return (
      <div className=" rounded">
          {posts.map((post, index) => 
              <SinglePost key={index} data={post} />
          )}
    </div>
  )
}

export default PostContainer