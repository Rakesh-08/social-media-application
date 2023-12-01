let {
    createPost,
    updatePost,
    getPostById,
    deletePost,
    likeDislikePost,
    getTimelinePosts,
    passComentsOnPost,
    updateComment,
    getAllCommentsByPost

} = require("../controllers/postsController");
let { verifyToken } = require("../middlewares/authMiddleware");
let {uploadPost}= require("../middlewares/upload")

module.exports = (app) => {
    app.post("/post",[verifyToken,uploadPost.single("post")],createPost);
    app.get("/post/:postId",getPostById);
    app.put("/post/:postId",verifyToken,updatePost);
    app.delete("/post/:postId",verifyToken,deletePost);
    app.put("/post/:postId/likeDislike", verifyToken, likeDislikePost);
    app.post("/post/:postId/comment", verifyToken, passComentsOnPost);
    app.get("/post/timeline/:userId", verifyToken, getTimelinePosts);
    app.put("/post/comment/:commentId", verifyToken,updateComment);
    app.get("/post/:postId/comment",verifyToken,getAllCommentsByPost)
}