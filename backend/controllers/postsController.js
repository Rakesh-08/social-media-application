let postModel = require("../models/postsModel");
let userModel = require("../models/userModal");

let createPost = async (req, res) => {

    let {imgPost,desc } = req.body;
    try {
           
        let post = await postModel.create({
            imgPost,desc
        })

        res.status(200).send(post)
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let getPostById = async (req, res) => {
    try {
        let post = await postModel.findOne({
            _id:req.params.postId
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
            return res.status(403).send({message:"you are not allowed to update someone else's post"})
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
             _id:req.params.postId
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
            msg= "you disliked the post"
        } else {
            post.likes.push(req._id);
            await post.save();
            msg= "you liked the post"
        }
      res.status(200).send(msg);

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
                message:"please provide a comment ,it can't be blank"
             })
        }

        let temp = {
            id: req._id,
            comment:description
        }

        let post = await postModel.findOne({ _id: req.params.postId });
        post.comments.push(temp);
        await post.save();

        res.status(200).send({message:"comment added into this post"});
         
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let getTimelinePosts = async (req, res) => {
    try {

        let myPosts = await postModel.find({
            userId: req._id
        }).sort({ createdAt:-1})

        let temp = await userModel.findOne({ _id: req._id });
        let arrayOfIds = temp.following;

        let postFromFollowing = await postModel.find({
            _id: {
                  $in:arrayOfIds
              }
        }).sort({ createdAt: -1 })
        
        if (req.query.own) {
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
    passComentsOnPost

}