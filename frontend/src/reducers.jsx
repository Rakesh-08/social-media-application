import { combineReducers } from "redux"

let initForm = {
  firstName: "",
  lastName: "",
  staysIn: "",
  about: "",
  workAt: "",
  Status: "",
  contact: "",
  profilePic: "",
  coverPic: "",
  confirmation: false,
};

let authReducers = (state=initForm, action) => {
    
    switch (action.type) { 
   
        case "updateInfo":
            
            let info = action.payload;
            return {...state,...info};
        default:
            return state
        
    }
}


let rootReducer = combineReducers({
    authReducers
})

export default rootReducer;