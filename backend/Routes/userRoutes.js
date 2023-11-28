let {
    getUserById,
    updateUserById,
    deleteUser,
    followUnfollowUser,
    unfollowUser,
    fetchUsers,
    uploadUserImages
} = require("../controllers/userController");
let { verifyToken } = require("../middlewares/authMiddleware");
let {uploadUserImage } = require("../middlewares//upload")

module.exports = (app) => {
    
    app.get("/user/:userId",verifyToken,getUserById);
    app.put("/user/:userId",verifyToken,updateUserById);
    app.delete("/user/:userId",verifyToken,deleteUser);
    app.put("/user/:userId/followUnfollow",verifyToken,followUnfollowUser);
    app.get("/users", verifyToken, fetchUsers);
    app.put("/user/:userId/upload", verifyToken, uploadUserImage.any("auth"),uploadUserImages)
    
}