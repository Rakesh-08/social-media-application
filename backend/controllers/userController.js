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
    let { followers, following } = req.body;

    try {
        let users;
        let query = [];

        if (followers) {
            query=followers
        } else if(following) {
            query=following
        }

        if (query?.length > 0) {
            users = await userModal.find({
                _id: {
                  $in: query
              }}) 
        }
         else {
            users = await userModal.find({});
    }
    
    if (users?.length < 1) {
        return res.status(404).send({
            message:"No users found"
        })
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
let deleteUser = async (req, res) => {
    try {
        await userModal.deleteOne({ _id: req.params.userId });

        res.status(200).send({
            message:"User deleted successfully"
        })

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
let followUser = async (req, res) => {
    let {userId} = req.params
    try {

        if (userId == req._id) {
            return res.status(400).send({
                message: "you can't follow your own account"
            })
        }

        let requester = await userModal.findOne({ _id: req._id });
        let referringTo = await userModal.findOne({ _id: userId });

        if (requester.following.includes(userId)) {
            return res.status(200).send({
                 message:"you are already following him"
             })
        }
        
        requester.following.push(userId);
        referringTo.followers.push(req._id);
        await requester.save();
        await referringTo.save();

        res.status(200).send({message:"you are now following him"});

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
let unfollowUser = async (req, res) => {
    let { userId } = req.params
    try {

        if (userId == req._id) {
            return res.status(400).send({
                message: "you can't Unfollow your own account"
            })
        }

        let requester = await userModal.findOne({ _id: req._id });
        let referringTo = await userModal.findOne({ _id: userId });

      

        if (!requester.following.includes(userId)) {
            return res.status(200).send({
                message: "you are not following him already"
            })
        }

        requester.following = requester.following.filter(id => id != userId);
        referringTo.followers=requester.followers.filter(id =>id!=req._id)
        await requester.save();
        await referringTo.save();

        res.status(200).send({ message: "you have unfollowed him" });

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

module.exports = {
    getUserById,
    updateUserById,
    deleteUser,
    followUser,
    unfollowUser,
    fetchUsers
}