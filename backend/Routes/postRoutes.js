let {
    createPost,
    updatePost,
    getPostById,
    deletePost,
    likeDislikePost,
    getTimelinePosts,
    passComentsOnPost
} = require("../controllers/postsController");
let { verifyToken } = require("../middlewares/authMiddleware");
let {uploadPost}= require("../middlewares/upload")

module.exports = (app) => {
    app.post("/post",verifyToken,uploadPost.single("post"),createPost);
    app.get("/post/:postId",getPostById);
    app.put("/post/:postId",verifyToken,updatePost);
    app.delete("/post/:postId",verifyToken,deletePost);
    app.put("/post/:postId/likeDislike", verifyToken, likeDislikePost);
    app.put("/post/:postId/comment", verifyToken, passComentsOnPost);
    app.get("/post",verifyToken,getTimelinePosts);
}