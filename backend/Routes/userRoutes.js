let {
    getUserById,
    updateUserById,
    deleteUser,
    followUnfollowUser,
    unfollowUser,
    fetchUsers
} = require("../controllers/userController");
let { verifyToken}= require("../middlewares/authMiddleware")

module.exports = (app) => {
    
    app.get("/user/:userId",verifyToken,getUserById);
    app.put("/user/:userId",verifyToken,updateUserById);
    app.delete("/user/:userId",verifyToken,deleteUser);
    app.put("/user/:userId/followUnfollow",verifyToken,followUnfollowUser);
    app.get("/users",verifyToken,fetchUsers)
    
}