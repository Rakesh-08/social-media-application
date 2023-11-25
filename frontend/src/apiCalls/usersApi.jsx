import axios from "axios";
import apis from "./apiUtils";

let token = {
    headers: {
        "x-access-token": localStorage.getItem("pgmToken")
    }
    
}


let updateUserDetails =async (obj) => {
     return await axios.put(apis.Base_Url+apis.updateUserDetailsApi,obj,token)
}

let followUser = async (id) => {
  return await axios.put(apis.Base_Url +`/user/${id}/follow`, token);
};
let unFollowUser = async (id) => {
  return await axios.put(apis.Base_Url + `/user/${id}/unfollow`,  token);
};

export {updateUserDetails,followUser,unFollowUser}
