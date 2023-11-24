import { combineReducers } from "redux"

let authInit={}

let authReducers = (state=authInit, action) => {
    
    switch (action.type) { 
   
        case "authInfo":
            return state;
        default:
            return state
        
    }
}


let rootReducer = combineReducers({
    authReducers
})

export default rootReducer;