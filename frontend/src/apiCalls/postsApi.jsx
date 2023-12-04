import axios from "axios";
import apis from "./apiUtils";

let token = {
  headers: {
    "x-access-token": localStorage.getItem("pgmToken"),
  },
};


let createPost = async (obj) => {
  
  return await axios.post(apis.Base_Url + apis.createPostApi, obj, token);
};

let updatePost = async (id,obj) => {

  return await axios.put(apis.Base_Url + `/post/${id}`, obj, token);
};
let deletePost = async (id) => {

  return await axios.delete(apis.Base_Url + `/post/${id}`, token);
};

let getTimelinePost = async (q,id) => {

    return await axios.get(apis.Base_Url + apis.getTimelinePostApi+`${id}?post=${q}`,token);
}

let likeDislike = async (id) => {

  return await axios.put(apis.Base_Url + `/post/${id}/likeDislike`, {}, token);
};

let commentOnPostApi = async (id,obj) => {

    return await axios.post(apis.Base_Url + `/post/${id}/comment`,obj ,token);
}

let updateComment = async (id, obj) => {
  return await axios.put(apis.Base_Url + `/post/comment/${id}`, obj, token);
};
let getAllCommentOnPost = async (id) => {
  return await axios.get(apis.Base_Url + `/post/${id}/comment`, token);
};
 

export {createPost, updatePost,deletePost,likeDislike,commentOnPostApi ,getTimelinePost,updateComment,getAllCommentOnPost };
