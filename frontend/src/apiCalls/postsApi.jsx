
import apis from "./apiUtils";



let createPost = async (obj) => {
  
  return await apis.axiosInstance.post(
     apis.createPostApi,
    obj
  );
};

let updatePost = async (id,obj) => {

  return await apis.axiosInstance.put( `/post/${id}`,
    obj
  );
};

let deletePost = async (id) => {

  return await apis.axiosInstance.delete( `/post/${id}`);
};

let getTimelinePost = async (q,id) => {
          
    return await apis.axiosInstance.get(apis.getTimelinePostApi+`${id}?post=${q}`);
}

let likeDislike = async (id) => {

  return await apis.axiosInstance.put(`/post/${id}/likeDislike`,
    {}
  );
};

let commentOnPostApi = async (id,obj) => {

    return await apis.axiosInstance.post(`/post/${id}/comment`, obj
    );
}

let updateComment = async (id, obj) => {
  return await apis.axiosInstance.put(`/post/comment/${id}`,
    obj
  );
};

let getAllCommentOnPost = async (id) => {
  return await apis.axiosInstance.get(`/post/${id}/comment`
  );
};
 

export {createPost, updatePost,deletePost,likeDislike,commentOnPostApi ,getTimelinePost,updateComment,getAllCommentOnPost };
