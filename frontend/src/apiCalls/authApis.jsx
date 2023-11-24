import axios from "axios";
import apis from "./apiUtils";



let signupCall = async(obj) => {
    return await axios.post(apis.Base_Url+apis.signupApi,obj)
}


let loginCall = async (obj) => {
  return await axios.post(apis.Base_Url + apis.loginApi, obj);
};

export {signupCall,loginCall}