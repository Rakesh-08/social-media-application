import { combineReducers } from "redux"
import { getUser } from "./apiCalls/usersApi"

let currentUser = () => {
  let id = JSON.parse(localStorage.getItem("authInfo"))._id;
  let result;

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

let initForm = {
  firstName: "",
  lastName: "",
  staysIn: "",
  about: "",
  workAt: "",
  Status: "",
  contact: "",
  fetch:currentUser
};


let authReducers = (state=initForm, action) => {
    
    switch (action.type) { 
   
        case "updateInfo":
            let info = action.payload;
            return { ...state, ...info };
        default:
            return state
        
    }
}

let utilReducer = (state = { searchTerm:""}, action) => {
  
  switch (action.type) { 
    
    case "searchTerm":
      return { ...state, searchTerm: action.searchTerm };
    default:
      return state;
  }
}


let rootReducer = combineReducers({
  authReducers,
  utilReducer
})

export default rootReducer;