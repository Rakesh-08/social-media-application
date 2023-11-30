import React,{useState,useEffect} from 'react';
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
import { commentOnPostApi, getAllCommentOnPost, likeDislike, updateComment } from '../apiCalls/postsApi';

const SinglePost = ({ data, setRefetchPost }) => {
  
  let [showComments, setShowComments] = useState(false)
  let [toggleHeartIcon, setToggleHeartIcon] = useState(false);
  
  useEffect(() => {
    if (data.likes.includes(JSON.parse(localStorage.getItem("authInfo"))?._id)) {
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
  
  return (
    <div style={{ background: "#effe" }} className=" p-2 rounded my-2 ">
      <div className="d-flex my-2 justify-content-between ">
        <div className="d-flex align-items-center">
          <Avatar img={data.profilePic} dim={40} />
          <span className="mx-2 ">@{data.username}</span>
        </div>
        <p onClick={() => alert("Working on some action buttons for the post")}>
          <MoreVertIcon />
        </p>
      </div>

      {data?.imgPost ? (
        <img
          style={{
            width: "100%",
            maxHeight: "20rem",
            borderRadius: "0.5em",
            objectFit: "contain",
          }}
          src={data.imgPost}
          alt="postPic"
        />
      ) : (
        <div className="fw-bold mx-2">{data?.desc}</div>
      )}

      <div className="d-flex border-top border-3 justify-content-between m-2 p-2">
       <div><span onClick={toggleLike} className="text-danger pointer ">
          {toggleHeartIcon ? (
            <FavoriteIcon style={{ fontSize: "2em" }} />
          ) : (
            <FavoriteBorderIcon style={{ fontSize: "2em" }} />
          )}
        </span>
        <CommentIcon
          onClick={() => setShowComments(true)}
          className=" text-primary pointer mx-4"
          style={{ fontSize: "2em" }}
        /></div> 
        <ReplyIcon className="fs-2 text-success pointer" />
      </div>
      <div className="d-flex m-2 ">
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
    
    if (!localStorage.getItem("pgmToken")) {
      return alert("please login first")
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
              There is no comment on your post 
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
  let [replyMsg,setReplyMsg] = useState("");

  let userId = JSON.parse(localStorage.getItem("authInfo"))?._id;

  let handleCommentReactions = () => {
     
    // like icon toggle;
                  if (toggleCommentDislike && !toggleCommentLike) {
                    setToggleCommentDisLike(false);
                    setToggleCommentLike(!toggleCommentLike);

                  } else if  (!toggleCommentDislike && toggleCommentLike) {
                     setToggleCommentLike(false);
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
        like: toggleCommentLike,
        dislike:toggleCommentDislike
       }
    }
    
    updateComment(comment._id, temp).then((res) => {
      console.log(res)
    }).catch((err) => { console.log(err) });
           
              }
  return (
    <div className={`d-flex ${comment.userId == userId && "justify-content-end"}`}>
      <div
        style={{ minWidth: "16em" }}
        className={`p-1 m-1 w-75 `}
        key={comment._id}
      >
        <div className="d-flex align-items-center">
          <Avatar img={comment.profilePic} dim={26} />
          <span style={{ fontSize: "0.9em" }} className="mx-2 fw-bold ">
            {comment.username}
          </span>
        </div>

        <div
          style={{
            background: comment.userId == userId ? "lightGreen" : "lightBlue",
            fontSize: "0.9rem",
          }}
          className="p-2 m-1 mx-2  rounded " >
          <p> { comment.desc}  </p>

          <div className="mt-2 d-flex justify-content-around  w-75">
            <div>
              <ThumbUpAltOutlinedIcon
                style={{ fontSize: "1em" }}
                className={`${toggleCommentLike && "text-primary"} `}
                onClick={handleCommentReactions}
              />{" "}
              <span className="smallFont">like</span>
            </div>

            <div>
              <ThumbDownAltOutlinedIcon
                style={{ fontSize: "1em" }}
                className={`${toggleCommentDislike && "text-primary"}`}
                onClick={handleCommentReactions}
                    
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