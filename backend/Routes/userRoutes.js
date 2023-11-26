let {
    getUserById,
    updateUserById,
    deleteUser,
    followUser,
    unfollowUser,
    fetchUsers
} = require("../controllers/userController");
let { verifyToken}= require("../middlewares/authMiddleware")

module.exports = (app) => {
    
    app.get("/user/:userId",verifyToken,getUserById);
    app.put("/user/:userId",verifyToken,updateUserById);
    app.delete("/user/:userId",verifyToken,deleteUser);
    app.put("/user/:userId/follow",verifyToken,followUser);
    app.put("/user/:userId/unfollow", verifyToken, unfollowUser);
    app.get("/users",verifyToken,fetchUsers)
    
}