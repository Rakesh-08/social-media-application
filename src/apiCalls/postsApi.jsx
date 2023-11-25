import axios from "axios";
import apis from "./apiUtils";

let token = {
  "x-accessToken": localStorage.getItem("pgmToken"),
};

let createPost = async (obj) => {
  return await axios.post(apis.Base_Url + apis.createPostApi, obj, token);
};

let updatePost = async (id) => {
  return await axios.put(apis.Base_Url + `/post/${id}`, token);
};
let deletePost = async (id) => {
  return await axios.delete(apis.Base_Url + `/post/${id}`, token);
};

let getTimelinePost = async () => {
    return await axios.get(apis.Base_Url + apis.getTimelinePostApi,token);
}

let likeDislike = async (id) => {
    return await axios.put(apis.Base_Url+`/post/${id}/likeDislike`, token);
};

let commentOnPostApi = async (id) => {
    return await axios.put(apis.Base_Url + `/post/${id}/comment`, token);
 }

export {createPost, updatePost, unupdatePost };
