let userModal = require("../models/userModal");
let bcrypt = require("bcryptjs");

let getUserById = async (req, res) => {
    try {

        let user = await userModal.findOne({ _id: req.params.userId });

        if (!user) {
            return res.status(404).send({
                message:"User not found"
            })
        }

        user.password=""

        res.status(200).send(user);
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

let fetchUsers = async (req, res) => {
    let { followers, following } = req.query
             

    try {
        let users;
        let query;

        let user = await userModal.findOne({
            _id:req._id
        })

        if (followers) {
            query = user?.followers;
        } else if (following) {
            query = user?.following;
        };




        if (query) {
            users = await userModal.find({
                _id: {
                  $in: query
                }
 })}
        else {
             users = await userModal.find({});
    }
    
        res.status(200).send(users)
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
     }

}

let updateUserById = async (req, res) => {
    let { password } = req.body;
  
    try {

        if (req.params.userId != req._id) {
            return res.status(403).send({
                message: "UnAuthorized request"
            })
        }

        if (password) {
            req.body.password =  await bcrypt.hashSync(password, 8)
        };

        let updatedUser = await userModal.findOneAndUpdate({
            _id: req._id
        },req.body,{new:true})
        
    if (!updatedUser) {
        return res.status(404).send({
            message: "There is no such user with given userId"
        })
        };
    
        {
            updatedUser.password = "";
             res.status(200).send(updatedUser)
             }

   
    } catch (err) {
        console.log(err);
        res.status(500).send( err )
    }
}

let uploadUserImages = async (req, res) => {
    
    try {
        if (req.params.userId != req._id) {
            return res.status(403).send({
                message: "UnAuthorized request"
            })
        }


        let user = await userModal.find({ _id: req._id });

        if (req.files && req.files.length == 2) {

            user.profilePic = `${process.env.BASE_URL}/usersImg/${req.files[0].filename}`;
            user.coverPic = `${process.env.BASE_URL}/usersImg/${req.files[1].filename}`;

        } else {

            if (req.files[0].originalname == "profilePic") {
                user.profilePic = `${process.env.BASE_URL}/usersImg/${req.files[0].filename}`;

            } else {
                user.coverPic = `${process.env.BASE_URL}/usersImg/${req.files[1].filename}`;

            }

        }

        await user.save();

        return res.status(200).send(user)
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

let deleteUser = async (req, res) => {

    try {

        if (req.params.userId != req._id) {
            return res.status(403).send({
                    message:"UnAuthorized request"
                })
        }
        
        await userModal.deleteOne({ _id: req.params.userId });

        res.status(200).send({
            message:"User deleted successfully"
        })

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

let followUnfollowUser = async (req, res) => {
    let { userId } = req.params;
    let { action } = req.query;
    try {

        if (userId == req._id) {
            return res.status(400).send({
                message: "you can't follow/unfollow your own account"
            })
        }

        let requester = await userModal.findOne({ _id: req._id });
        let referringTo = await userModal.findOne({ _id: userId });
       
        if (action=="follow") {
       
            if (requester.following.includes(userId)) {
                return res.status(200).send({
                    message: "you are already following him"
                })
            }
        
            requester.following.push(userId);
            referringTo.followers.push(req._id);
            await requester.save();
            await referringTo.save();

        

            res.status(200).send(requester)
        } else {
         

            if (!requester.following.includes(userId)) {
                return res.status(200).send({
                    message: "you are not following him already"
                })
            }

            requester.following = requester.following.filter(id => id != userId);
            referringTo.followers = requester.followers.filter(id => id != req._id)
            await requester.save();
            await referringTo.save();
            

            res.status(200).send(requester);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}


module.exports = {
    getUserById,
    updateUserById,
    deleteUser,
    followUnfollowUser,
    fetchUsers,
    uploadUserImages
}