import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
import ClearIcon from "@mui/icons-material/Clear";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Avatar from './Avatar';
import { Modal } from "react-bootstrap";
import { commentOnPostApi, deletePost, getAllCommentOnPost, likeDislike, updateComment,updatePost } from '../apiCalls/postsApi';

const SinglePost = ({ data, setRefetchPost }) => {
  
  let [showComments, setShowComments] = useState(false)
  let [toggleHeartIcon, setToggleHeartIcon] = useState(false);
  let [showActions, setShowActions] = useState(false);
  let [openEditModal,setOpenEditModal] = useState(false);
  
  let id=JSON.parse(localStorage.getItem("authInfo"))?._id
  
  useEffect(() => {
    if (data.likes.includes(id)) {
          setToggleHeartIcon(true)
        }
  },[])
    
  let toggleLike = () => {

    setToggleHeartIcon(!toggleHeartIcon);

    if (!localStorage.getItem("pgmToken") || !data._id) {
      return;
    }
    setRefetchPost(false)
    
    likeDislike(data._id).then((res) => {
      setRefetchPost(true)
      
    }).catch((err) => {
      console.log(err)
    })
     
  }

  let deletePostFn = () => {
    let confirmation = window.confirm('Are you sure you want to delete this Post?');

    if (confirmation) {
      // invoke deletePost api call
      deletePost(data._id).then((res) => {
        console.log(res);
        setRefetchPost(true)
      }).catch(err=>console.log(err))
  
    }
    setShowActions(false);
  }


  return (
    <div
      style={{background:"rgb(219,318,222)",borderRadius:"3px", boxShadow: "0.1em 0.1em 0.2em 0.2em" }}
      className=" p-2 my-2 position-relative "
    >
      <div className="d-flex my-2 justify-content-between ">
        <div className="d-flex align-items-center">
          <Avatar img={data.profilePic} dim={40} userId={data.userId} />
          <span className="mx-2 ">@{data.username}</span>
        </div>
        <div>
          {showActions && (
            <div
              style={{
                position: "absolute",
                top: "1.8em",
                right: "1.8em",
                borderRadius: "0.9em 0em 0.5em 0.9em",
              }}
              className="bg-white p-3"
            >
              <p
                onClick={() => alert("post saved in your saved library")}
                className="authHover"
              >
                Save post
              </p>
              {data.userId && data.userId == id && (
                <p
                  onClick={() => {
                    setOpenEditModal(true);
                    setShowActions(false);
                  }}
                  className="authHover"
                >
                  Edit post
                </p>
              )}

              {data.userId && data.userId == id && (
                <p onClick={deletePostFn} className="authHover text-danger">
                  Delete post
                </p>
              )}
            </div>
          )}
          <PostEditModal
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            post={data}
          />

          <MoreVertIcon onClick={() => setShowActions(!showActions)} />
        </div>
      </div>

      {data?.imgPost ? (
        <img
          style={{
            width: "100%",
            maxHeight: "24rem",
            borderRadius: "0.5em",
            objectFit: "contain",
          }}
          src={data.imgPost}
          alt="postPic"
        />
      ) : data.videoUrl && data.dummy ? (
        <iframe
          className="rounded-2"
          width="100%"
          height="270"
          src={`https://www.youtube.com/embed${data.videoUrl}?si=Yq5-Fxb0vAttMPFa`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : !data.dummy && data.videoUrl ? (
        <video controls src={data.videoUrl} width="100%" />
      ) : (
        <div className="fw-bold mx-2">{data?.desc}</div>
      )}

      <div className="d-flex border-top border-3 justify-content-between  p-2">
        <div>
          <span onClick={toggleLike} className="text-danger pointer ">
            {toggleHeartIcon ? (
              <FavoriteIcon style={{ fontSize: "2em" }} />
            ) : (
              <FavoriteBorderIcon style={{ fontSize: "2em" }} />
            )}
          </span>
          <CommentIcon
            onClick={() => setShowComments(!showComments)}
            className=" text-primary pointer mx-4"
            style={{ fontSize: "2em" }}
          />
        </div>

        <ReplyIcon
          onClick={() => alert("Post sharing feature is not available ")}
          className="fs-2 share-btn text-success pointer"
        />
      </div>
      <div className="d-flex  ">
        <div className="mx-2  ">
          {data.likes.length}
          <span className="text-secondary "> likes</span>{" "}
        </div>
        <div className="mx-2 ">
          {data.comments.length}{" "}
          <span className="text-secondary"> comments</span>
        </div>
      </div>
      <div className=" mx-2">
        {data.imgPost && data.desc}
        <span className="text-primary"> #web-development, #MERN_Stack</span>
      </div>
      <p className="smallFont mx-2">Posted on {data.createdAt.slice(0, 10)}</p>

      {showComments && (
        <CommentComponent
          showComments={showComments}
          setShowComments={setShowComments}
          data={data}
        />
      )}
    </div>
  );
}

export default SinglePost;


let CommentComponent = ({ data,setShowComments, showComments }) => {
  let [comments,setComments]=useState([])
  let [commentInput, setCommentInput] = useState("");

  useEffect(() => {

    if (data._id) {
       fetchComments();
    }
   
  }, []);
  
  let fetchComments = () => {
    getAllCommentOnPost(data._id).then((res) => {
        setComments(res.data)
      }).catch((err) => {console.log(err)});
  }

  let sendComment = () => {
    
    if (!data._id) {
      return alert("Its a dummy post uploaded by admin,you can't send comments on this post")
    }

    if (!commentInput.trim()) {
      return
    }
    
    commentOnPostApi(data._id,{desc:commentInput}).then((res) => {
      setCommentInput("")
      fetchComments()
    }).catch(err => {
      console.log(err)
    })
  }
  
  return (
    <div>
      <div className="d-flex my-3">
        <input
          className="form-control"
          type="text"
          placeholder="Type your comment ......"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button onClick={sendComment} className=" mx-2 btn btn-primary btn-sm">
          {" "}
          <SendIcon />
        </button>
      </div>
      <div className=" border shadow-lg rounded my-2">
        <div className="p-2 my-2 d-flex justify-content-between border-bottom border-3">
          <span className="fst-italic fw-bold">Comments</span>
          <span>
            <ClearIcon
              onClick={() => setShowComments(false)}
              className="pointer"
            />
          </span>
        </div>

        {comments.length == 0 ? (
          <div className="d-flex justify-content-center my-3">
            {" "}
            <p className=" m-2 p-2 btn btn-outline-primary">
              {" "}
             Be the first to comment on this post
            </p>
          </div>
        ) : (
          <div className="p-3 m-2 my-2">
            {comments.map((comment, i) => (
              <Comment key={i} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


let Comment = ({ comment }) => {
   let [toggleCommentLike, setToggleCommentLike] = useState(false);
  let [toggleCommentDislike, setToggleCommentDisLike] = useState(false);
  let [openReply, setOpenReply] = useState(false);
  let [replyMsg, setReplyMsg] = useState("");

  let userId = JSON.parse(localStorage.getItem("authInfo"))?._id;
  
  useEffect(() => {
     
    if (comment.likes.includes(userId)) {
              setToggleCommentLike(true)
    }

    if (comment.dislikes.includes(userId)) {
      setToggleCommentDisLike(true)
     }
},[])

  let handleCommentReactions = (action) => {

    // like dislike both can't be used;
    let ld={}
    
    if (action == "like") {
      if (toggleCommentDislike && !toggleCommentLike) {
        setToggleCommentDisLike(false)
        ld.dislike = false;
      } else {
       
        ld.dislike = toggleCommentDislike;
      }
         ld.like = !toggleCommentLike;
            setToggleCommentLike(!toggleCommentLike);
    } else if (action == "dislike")
    { 
      
      if (toggleCommentLike && !toggleCommentDislike) {
        setToggleCommentLike(false)
        ld.like=false
      } else {
         ld.like = toggleCommentLike
      }

          ld.dislike = !toggleCommentDislike;
      setToggleCommentDisLike(!toggleCommentDislike);
    }
         
     if (!localStorage.getItem("pgmToken")) {
       return;
    };

    let temp;

    if (openReply) {
      temp = {
        username:comment.username,
        profilePic:comment.profilePic,
        replyMsg:replyMsg
      }
    } else {
      temp = {
        like: ld.like,
        dislike: ld.dislike
      }
      
    }
    
    updateComment(comment._id, temp).then((res) => {
      console.log(res)
    }).catch((err) => { console.log(err) });
           
              }
  return (
    <div
      className={`d-flex ${comment.userId == userId && "justify-content-end"}`}
    >
      <div
        style={{ maxWidth: "80%" }}
        className={`p-1 m-1  `}
        key={comment._id}
      >
        <div className="d-flex align-items-center">
          <Avatar img={comment.profilePic} dim={26} userId={comment.userId} />
          <span style={{ fontSize: "0.9em" }} className="mx-2 fw-bold ">
            {comment.username}
          </span>
        </div>

        <div
          style={{
            background: comment.userId == userId ? "lightGreen" : "lightBlue",
            fontSize: "0.9rem",
          }}
          className="p-2 m-1 mx-2  rounded "
        >
          <p> {comment.desc} </p>

          <div className="mt-2 d-flex justify-content-around  w-75">
            <div>
              <ThumbUpAltOutlinedIcon
                style={{ fontSize: "1em" }}
                className={`${toggleCommentLike && "text-primary"} `}
                onClick={() => {
                  
                  handleCommentReactions("like");
                }}
              />{" "}
              <span className="smallFont">like</span>
            </div>

            <div>
              <ThumbDownAltOutlinedIcon
                style={{ fontSize: "1em" }}
                className={`${toggleCommentDislike && "text-primary"}`}
                onClick={() => {
                  
                  handleCommentReactions("dislike")
                }}
              />{" "}
              <span className="smallFont">dislike</span>
            </div>

            <div>
              {" "}
              <ReplyIcon />
              <span className="smallFont">reply</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let PostEditModal = ({ openEditModal, setOpenEditModal, post }) => {
  let [editedPost, setEditedPost] = useState({ desc: post.desc, img: "", video: "" });

  let handlePostEdit = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("pgmToken")) {
       return alert("Please login to access")
    }
   

    if (editedPost.desc == post.desc && !(editedPost.img || editedPost.video)) {
      return console.log("no change has done so no need to call api")
      }

    let Data = new FormData();

    Data.append("description", editedPost.desc);

    if (post.imgPost) {
      Data.append("postUpdate", editedPost.img);
    }
    if (post.videoUrl) {
      Data.append("postUpdate",editedPost.video)

    }
    
    
    updatePost(post._id,Data).then(res => {
        alert("Post updated successfully")
      setEditedPost({desc:post.desc,img:"",video:""})
    }).catch(err=>console.log(err))

    
  }
  return (
    <Modal show={openEditModal} onHide={() => setOpenEditModal(false)}>
      <Modal.Body>
        <form onSubmit={handlePostEdit} encType="multipart/form-data">
          <div className="d-flex mb-3 justify-content-between ">
            <h5>Edit your post</h5>
            <ClearIcon onClick={() => setOpenEditModal(false)} />
          </div>
          <input
            className="form-control m-2"
            type="text"
            placeholder="new description for the post......"
            value={editedPost.desc}
            onChange={(e) =>
              setEditedPost({ ...editedPost, desc: e.target.value })
            }
          />{" "}
          {post.imgPost && (
            <div className="m-2 my-3">
              <h6>Upload new img</h6>
              <input
                type="file"
                id="imgUpload"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEditedPost({ ...editedPost, img: e.target.files[0] });
                  }
                }}
              />
            </div>
          )}
          {post.videoUrl && (
            <div className="my-3 m-2">
              <h6>Upload new video</h6>
              <input
                type="file"
                id="videoUpload"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEditedPost({ ...editedPost, video: e.target.files[0] });
                  }
                }}
              />
            </div>
          )}
          <div className="d-flex justify-content-end">
            <div>
              <button
                type="button"
                onClick={() => setOpenEditModal(false)}
                className="btn btn-info m-2 my-3 "
              >
                back
              </button>

              <button className="btn btn-success m-2 my-3">confirm</button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}


