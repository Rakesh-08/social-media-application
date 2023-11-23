let postModel = require("../models/postsModel");

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
    try {
         
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

let getTimelinePosts = async (req, res) => {
    try {

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