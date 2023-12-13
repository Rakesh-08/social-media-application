let userModal = require("../models/userModal");
let postModel = require("../models/postsModel")
let bcrypt = require("bcryptjs");

let fs = require("fs");
const { sendNotifications } = require("./notificationController");


let getUserById = async (req, res) => {
    try {

        let user = await userModal.findOne({ _id: req.params.userId });

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            })
        }

        user.password = ""

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
            _id:req.params.userId
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
            })
        } else {
            users = await userModal.find({});
        }

        res.status(200).send(users)

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }

}

let updateUserById = async (req, res) => {

    try {

        if (req.params.userId != req._id) {
            return res.status(403).send({
                message: "UnAuthorized request"
            })
        }

        let updatedUser = await userModal.findOneAndUpdate({
            _id: req._id
        }, req.body, { new: true })

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
        res.status(500).send(err)
    }
}


let uploadUserImages = async (req, res) => {

    let { profile, cover } = req.files;

    let baseUrl = process.env.NODE_ENV !== "production" ? "http ://localhost:8040" : "https://photogram-app.onrender.com"

    try {
        if (req.params.userId != req._id) {
            return res.status(403).send({
                message: "UnAuthorized request"
            })
        }

        let user = await userModal.findOne({ _id: req._id });

        // check profile has to be updated or not
        if (profile && profile.length > 0) {


            // delete old img from server storage
            if (user.profilePic) {
                let temp = user.profilePic.split("/usersImg");

                fs.unlink("public/usersImg" + temp[1], (err) => {
                    if(err){
                        console.log(err);
                    return res.status(500).send({
                        message: "some error occured while changing profile image"
                    })}
                })
            }

            user.profilePic = `${baseUrl}/usersImg/${profile[0].filename}`;


            // update the images stored in post model
            let myPosts = await postModel.updateMany({
                userId: req._id
            }, {
                profilePic: user.profilePic
            });
        };

        // check cover img has to be updated
        if (cover && cover.length > 0) {

            // delete old img from server storage
            if (user.coverPic) {
                let temp = user.coverPic.split("/usersImg");

                fs.unlink("public/usersImg" + temp[1], (err) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            message: "some error occured while changing profile image"
                        })
                    }

                })
            }

            user.coverPic = `${baseUrl}/usersImg/${cover[0].filename}`;
        }

        await user.save();
        res.status(200).send(user)

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

let changePassword = async (req, res) => {
    let { username, newPassword } = req.body;

    try {
        let user = await userModal.findOne({ username: username });

        if (!user) {
            return res.status(404).send({
                message: "Incorrect username! no user found"
            });
        }

        user.password = await bcrypt.hash(newPassword, 8);

        await user.save();

        res.status(200).send({
            message: "Password has been updated successfully,please try to login now"
        })

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

let deleteUser = async (req, res) => {

    try {

        if (req.params.userId != req._id) {
            return res.status(403).send({
                message: "UnAuthorized request"
            })
        }

        await userModal.deleteOne({ _id: req.params.userId });

        res.status(200).send({
            message: "User deleted successfully"
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

        if (action == "follow") {

            if (requester.following.includes(userId)) {
                return res.status(200).send({
                    message: "you are already following him"
                })
            }

            requester.following.push(userId);
            referringTo.followers.push(req._id);
            await requester.save();
            await referringTo.save();

             sendNotifications(req._id,[userId],`${requester.firstName} has just started following you`,requester.profilePic)

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
    uploadUserImages,
    changePassword
}
