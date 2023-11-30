let apis = {
    
    Base_Url:import.meta.env.PROD?"https://photogram-app.onrender.com":"http://localhost:8040",
    signupApi: "/Auth/signup",
    loginApi: "/Auth/login",
    createPostApi: "/post",
    updatePostApi: "/post/:postId",
    deletePostApi: "/post/:postId",
    getTimelinePostApi: "/post",
    updateUserDetailsApi: "/user/:userId",
};

export default apis;