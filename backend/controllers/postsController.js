let postModel = require("../models/postsModel");
let userModel = require("../models/userModal");
let commentModel = require("../models/commentsModel");
let fs=require("fs")

let baseUrl = process.env.NODE_ENV !== "production" ? "http://localhost:8040" : "https://photogram-app.onrender.com";

let createPost = async (req, res) => {

    let desc = req.body.description;
   
    try {
        if (!(req.file || desc)) {
            return res.status(400).send({
                message: "your post can't be empty"
            })
        }

        let user = await userModel.findOne({ _id: req._id });

        let temp = {
            userId: req._id,
            desc: desc,
            username: user.username,
            profilePic: user.profilePic
        }

        let url;

        if (req.file) {
            url = `${baseUrl}/posts/${req.file.filename}`
        } else {
            url = ""
        };

        if (req.body.postType == "image") {
            temp.imgPost = url;
         }else if (req.body.postType == "video") {
            temp.videoUrl = url;
        }


        let post = await postModel.create(temp);

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

    let { description } = req.body;

    try {
        let post = await postModel.findOne({ _id: req.params.postId });
        if (!post) {
            return res.status(404).send({ message: "NO post found with givenid" });
        }

        if (post.userId != req._id) {
            return res.status(403).send({ message: "you are not allowed to update someone else's post" })
        }

        post.desc = description ? description : post.desc;
      
    if (req.file) {

        let url = `${baseUrl}/posts/${req.file.filename}`
        let temp = post.imgPost ? post.imgPost.split("/posts") : post.videoUrl.split("/posts")

         // delete old img from server storage
         fs.unlink("public/posts" + temp[1], (err) => {
             if (err) {
                  return res.status(500).send({
                    message: "some error occured while clearing old image of post"
                }) 
              }
               
            });
       
        if (post.imgPost) {
        post.imgPost = url;
        }
       
        if (post.videoUrl) {
            post.videoUrl = url;
        }

          }
       
        await post.save();
res.status(200).send(post)

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

  // remove the image or video from server;
        let temp = "";

        if (post.imgPost) {
              temp=(post.imgPost.split("/posts"))[1]
        }
        if (post.videoUrl) {
            temp=(post.videoUrl.split("/posts"))[1]
        }

        if (temp) {
            fs.unlink("public/posts" + temp, (err) => {
            if (err) {
                return res.status(500).send({
                    message: "some error occured while clearing old image of post"
                })
            }

            });
        }

        // delete all comments from database
        await commentModel.deleteMany({ postId: post._id });

        
       // remove post id from user model;
        let user = await userModel.findOne({ _id: req._id });
        user.posts = user.posts.filter(id => id != req.params.postId);
        await user.save();
   
        // and finally delete the post
        await postModel.deleteOne({
            _id: req.params.postId
        })

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
        let post = await postModel.findOne({ _id: req.params.postId });
        post.comments.push(createComment._id);
        await post.save();

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