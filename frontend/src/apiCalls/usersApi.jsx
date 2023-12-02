import axios from "axios";
import apis from "./apiUtils";

let tokenHeader = {
    headers: {
        "x-access-token": localStorage.getItem("pgmToken")
    }
    
}

let getUser = async (id) => {
  let token = await tokenHeader;
   return await axios.get(apis.Base_Url+ `/user/${id}`,token)
 }

let updateUserDetails = async (obj,id) => {
  let token = await tokenHeader;
     return await axios.put(apis.Base_Url + `/user/${id}`, obj, token);
}

let uploadUserPics = async (obj,id) => {
  let token = await tokenHeader;
  return await axios.put(apis.Base_Url+`/user/${id}/upload`,obj,token)
}

let deleteUser = async (id) => {
   let token = await tokenHeader;
  return await axios.delete(apis.Base_Url+`/user/${id}`,token)
}

let fetchAllUsers = async (q,id) => {
  let token = await tokenHeader;
  return await axios.get(apis.Base_Url+`/users/${id}?${q}=${true}`,token)
}

let followUnfollowUser = async (id,action) => {
   let token = await tokenHeader;
  return await axios.put(apis.Base_Url +`/user/${id}/followUnfollow?action=${action}`,{},token);
};


export {updateUserDetails,followUnfollowUser,deleteUser,fetchAllUsers,getUser,uploadUserPics}
