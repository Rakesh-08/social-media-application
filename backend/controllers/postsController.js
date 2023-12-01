let postModel = require("../models/postsModel");
let userModel = require("../models/userModal");
let commentModel = require("../models/commentsModel");


let createPost = async (req, res) => {

    let desc = req.body.description;
    let baseUrl = process.env.NODE_ENV !== "production" ? "http ://localhost:8040" : "https://photogram-app.onrender.com"

    try {
        if (!(req.file || desc)) {
            return res.status(400).send({
                message: "your post can't be empty"
            })
        }

        let url;

        if (req.file) {
            url = `${baseUrl}/posts/${req.file.filename}`
        } else {
            url = ""
        }


        let user = await userModel.findOne({ _id: req._id });

        let post = await postModel.create({
            userId: req._id,
            desc: desc,
            imgPost: url,
            username: user.username,
            profilePic: user.profilePic
        })


        user.posts.push(post._id);
        await user.save();

        res.status(200).send(post)

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let getPostById = async (req, res) => {
    try {
        let post = await postModel.findOne({
            _id: req.params.postId
        })

        if (!post) {
            return res.status(404).send("NO post found with givenid");
        }

        res.status(200).send(post)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let updatePost = async (req, res) => {
    try {
        let post = await postModel.findOne({ _id: req.params.postId });
        if (!post) {
            return res.status(404).send({ message: "NO post found with givenid" });
        }

        if (post.userId != req._id) {
            return res.status(403).send({ message: "you are not allowed to update someone else's post" })
        }

        let updatedPost = await postModel.updateOne({
            _id: req.params.postId
        }, req.body);

        res.status(200).send(updatedPost)

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let deletePost = async (req, res) => {
    try {
        let post = await postModel.findOne({ _id: req.params.postId });

        if (!post) {
            return res.status(404).send({ message: "NO post found with given id" });
        }

        if (post.userId != req._id) {
            return res.status(403).send({ message: "you are not allowed to delete someone else's post" })
        };

        await postModel.deleteOne({
            _id: req.params.postId
        })

        let user = await userModel.findOne({ _id: req._id });
        user.posts = user.posts.filter(id => id != req.params.postId);
        await user.save();

        res.status(200).send({ message: "post deleted successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let likeDislikePost = async (req, res) => {
    try {
        let post = await postModel.findOne({
            _id: req.params.postId
        });

        if (!post) {
            return res.status(404).send({
                message: "NO post found with given id"
            });
        };

        let msg;

        if (post.likes.includes(req._id)) {
            post.likes = post.likes.filter(id => id != req._id);
            await post.save();
            msg = "you disliked the post"
        } else {
            post.likes.push(req._id);
            await post.save();
            msg = "you liked the post"
        }
        res.status(200).send({ message: msg });

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let passComentsOnPost = async (req, res) => {

    let description = req.body.desc;
    try {

        if (!description) {
            return res.status(400).send({
                message: "please provide a comment ,it can't be blank"
            })
        }

        let user = await userModel.findOne({ _id: req._id })

        let temp = {
            userId: req._id,
            desc: description,
            profilePic: user.profilePic,
            username: user.username,
            postId: req.params.postId,
        }

        let createComment = await commentModel.create(temp);
        res.status(200).send(createComment);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let updateComment = async (req, res) => {
    let { username, profilePic, replyMsg, like, dislike } = req.body;
    try {
        let comment = await commentModel.findOne({ _id: req.params.commentId });


        if (like && !dislike) {
            comment.likes.push(req._id);
            if (comment.dislikes.includes(req._id)) {
                comment.dislikes.filter(id => id != req._id);
            }

            await comment.save();
            return res.status(200).send({
                message: "comment liked"
            })
        } else if (!like && dislike) {
            comment.dislikes.push(req._id)
            if (comment.likes.includes(req._id)) {
                comment.likes = comment.likes.filter(id => id != req._id)

            }

            await comment.save();
            return res.status(200).send({
                message: "comment disliked"
            })
        } else {

            if (comment.dislikes.includes(req._id)) {
                comment.likes = comment.likes.filter(id => id != req._id)
            }
            if (comment.likes.includes(req._id)) {
                comment.dislikes.filter(id => id != req._id);
            }

            await comment.save();
            return res.status(200).send({
                message: "No reaction"
            })
        }

        let temp = {
            userId: req._id, username, profilePic, replyMsg
        }

        comment.reply.push(temp);
        await comment.save();
        res.status(200).send(temp)

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

let getAllCommentsByPost = async (req, res) => {
    try {

        let comments = await commentModel.find({
            postId: req.params.postId
        })

        res.status(200).send(comments)

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let getTimelinePosts = async (req, res) => {

    let { userId } = req.params;

    try {

        let myPosts = await postModel.find({
            userId: userId
        }).sort({ createdAt: -1 })

        let temp = await userModel.findOne({ _id: userId });
        let arrayOfIds = temp.following;

        let postFromFollowing = await postModel.find({
            userId: {
                $in: arrayOfIds
            }
        }).sort({ createdAt: -1 })

        if (req.query.post == "own") {
            res.status(200).send(myPosts)

        }
        else {

            res.status(200).send(myPosts.concat(postFromFollowing))

        }


    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}


module.exports = {
    createPost,
    updatePost,
    getPostById,
    deletePost,
    likeDislikePost,
    getTimelinePosts,
    passComentsOnPost,
    updateComment,
    getAllCommentsByPost
}