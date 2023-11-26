import axios from "axios";
import apis from "./apiUtils";

let tokenHeader = {
    headers: {
        "x-access-token": localStorage.getItem("pgmToken")
    }
    
}


let updateUserDetails = async (obj) => {
  let token = await tokenHeader;
     return await axios.put(apis.Base_Url+apis.updateUserDetailsApi,obj,token)
}

let deleteUser = async (id) => {
   let token = await tokenHeader;
  return await axios.delete(apis.Base_Url+`/user/${id}`,token)
}

let followUser = async (id) => {
   let token = await tokenHeader;
  return await axios.put(apis.Base_Url +`/user/${id}/follow`, token);
};
let unFollowUser = async (id) => {
   let token = await tokenHeader;
  return await axios.put(apis.Base_Url + `/user/${id}/unfollow`,  token);
};

export {updateUserDetails,followUser,unFollowUser,deleteUser}
