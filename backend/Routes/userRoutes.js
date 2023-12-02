let {
    getUserById,
    updateUserById,
    deleteUser,
    followUnfollowUser,
    unfollowUser,
    fetchUsers,
    uploadUserImages,
    changePassword
} = require("../controllers/userController");
let { verifyToken } = require("../middlewares/authMiddleware");
let {uploadMiddleware } = require("../middlewares//upload")

module.exports = (app) => {

   
    
    app.get("/user/:userId",verifyToken,getUserById);
    app.put("/user/:userId",verifyToken,updateUserById);
    app.delete("/user/:userId",verifyToken,deleteUser);
    app.put("/user/:userId/followUnfollow",verifyToken,followUnfollowUser);
    app.get("/users/:userId", verifyToken, fetchUsers);
    app.put("/user/:userId/upload", [verifyToken, uploadMiddleware], uploadUserImages);
    app.put("/user/password/forgot",changePassword)
    
}