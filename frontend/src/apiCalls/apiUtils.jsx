import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "http://localhost:8040"
});


axiosInstance.interceptors.request.use(
  (config) => {
        const token = localStorage.getItem("pgmToken"); 
    if (token) {
        config.headers["x-access-token"] = token
    }
    return config;
  },
    (error) => {
      console.log("error: " + error)
    return Promise.reject(error);
  }
);


let apis = {
    
    Base_Url: import.meta.env.PROD ? "https://photogram-app.onrender.com" : "http://localhost:8040",
    axiosInstance,
    signupApi: "/Auth/signup",
    loginApi: "/Auth/login",
    forgorPasswordApi:"/user/password/forgot",
    createPostApi: "/post",
    updatePostApi: "/post/:postId",
    deletePostApi: "/post/:postId",
    getTimelinePostApi: "/post/timeline/",
    updateUserDetailsApi: "/user/:userId",
};

export default apis;