import React,{useState} from 'react';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from './Avatar';

const SinglePost = ({ data }) => {
    let [toggleHeartIcon, setToggleHeartIcon] = useState(false);
  return (
      <div style={{background:"#effe" }} className=" p-2 rounded my-2 ">
          <div className="d-flex my-2 justify-content-between ">
              <div className="d-flex align-items-center">< Avatar img={data.avatar} dim={40} />
              <span className="mx-2 ">@{data.username}</span>
        </div>
        <p><MoreVertIcon/></p>
       </div>
          <img
        style={{ width: "100%", maxHeight: "20rem", borderRadius: "2%",objectFit:"cover" }}
        src={data.postPic}
        alt="postPic"
      />
      <div className="w-25  d-flex justify-content-between m-2">
        <span
          onClick={() => setToggleHeartIcon(!toggleHeartIcon)}
          className="text-danger "
        >
          {toggleHeartIcon ? (
            <FavoriteIcon className="fs-2 " />
          ) : (
            <FavoriteBorderIcon className="fs-2" />
          )}
        </span>
        <CommentIcon className="fs-2 text-secondary pointer" />
        <ReplyIcon className="fs-2 text-success pointer" />
      </div>
      <div className="d-flex m-2 ">
        <div className="mx-2 fw-bold smallFont">
          {data.likes} likes
        </div>
        <div className="mx-2 fw-bold smallFont">
          {data.comments} comments
        </div>
      </div>
      <div className="fw-bold mx-2">
        {data.hashtag}  <span className="text-primary"> ##web-development, #MERN_Stack</span>
            
      </div>
          <p className="smallFont mx-2">Posted on { data.postedAt}</p>
    </div>
  );
}

export default SinglePost