import { combineReducers } from "redux"
import { getUser } from "./apiCalls/usersApi"




let currentUser = () => {
  let id = JSON.parse(localStorage.getItem("authInfo"))?._id;
  let result;
   if (!localStorage.getItem("pgmToken")) {
     return;
  }

  getUser(id)
    .then((res) => {
      result = res.data;
        localStorage.setItem("authInfo", JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

let init = {
  fetch: currentUser,
};


let authReducers = (state=init, action) => {
    
    switch (action.type) { 
   
        default:
            return state
        
    }
}

let utilReducer = (state = { searchTerm:"",profileId:JSON.parse(localStorage.getItem("authInfo"))?._id}, action) => {
  
  switch (action.type) { 
    
    case "searchTerm":
      return { ...state, searchTerm: action.searchTerm };
    case "otherProfile":
      console.log(action.userId)
      return { ...state, profileId: action.userId };
    default:
      return state;
  }
}


let rootReducer = combineReducers({
  authReducers,
  utilReducer
})

export default rootReducer;