
import apis from "./apiUtils";



let getUser = async (id) => {
 return await apis.axiosInstance.get(`/user/${id}`);
 }

let updateUserDetails = async (obj,id) => {
     return await apis.axiosInstance.put(
       `/user/${id}`,
       obj
     );
}

let uploadUserPics = async (obj,id) => {
  return await apis.axiosInstance.put( `/user/${id}/upload`,
    obj
  );
}

let deleteUser = async (id) => {
  return await apis.axiosInstance.delete(`/user/${id}`);
}

let fetchAllUsers = async (q,id) => {
  return await apis.axiosInstance.get(`/users/${id}?${q}=${true}`
  );
}

let followUnfollowUser = async (id,action) => {
  return await apis.axiosInstance.put(`/user/${id}/followUnfollow?action=${action}`,
    {}
  );
};


export {updateUserDetails,followUnfollowUser,deleteUser,fetchAllUsers,getUser,uploadUserPics}
