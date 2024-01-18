import React, { useState } from 'react';
import { Box, Card, Stack,Typography } from "@mui/material"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClearIcon from "@mui/icons-material/Clear";
import PostContainer from './PostContainer';
import SendIcon from "@mui/icons-material/Send";
import Avatar from './Avatar';
import dummyUser from '../utils/dummyUser';
import { createPost } from '../apiCalls/postsApi';



const FeedSide = ({profile,user}) => {
  let [refetchPost, setRefetchPost] = useState(false);

  let loggedUserId = JSON.parse(localStorage.getItem("authInfo"))?._id;


  return (
    <Box  py={1} sx={{ minHeight: "100vh" }}>

      {(!profile||user._id && user._id == loggedUserId)&&
      <SharePostConttainer userId={user._id} setRefetchPost={setRefetchPost} />}
      {profile && (
        <Typography sx={{ color: "blueddew",textDecoration:"underline" }} variant="h6" m={3}>
          <span className="mx-1">
            <SendIcon />
          </span>{" "}
           Posts of {user.firstName}
        </Typography>
      )}

      <PostContainer profile={profile} setRefetchPost={setRefetchPost}  refetchPost={refetchPost} user={user} />
    </Box>
  );
}



export default FeedSide;

let SharePostConttainer = ({ setRefetchPost, userId }) => {
  
  let [imgUpload, setImgUpload] = useState("");
  let [videoUpload, setVideoUpload] = useState("");
  let [newPostDescription, setNewPostDescription] = useState("");
  let [showSpinner, setShowSpinner] = useState(false);

 
  let handlePostShare = async (e) => {
    e.preventDefault();

    if (!(imgUpload || newPostDescription||videoUpload)) {
        return alert("empty post can't be uploaded")
    }

    if (imgUpload && videoUpload) {
      return alert("Please post either a video or an image, uploading both is not possible at the moment");

    }

     if (!localStorage.getItem("pgmToken")) {
       alert("Please login first to share anything with your friends");
       return;
    }
    setShowSpinner(true)
    
    let Data = new FormData();
    Data.append("description", newPostDescription);

    if (imgUpload) {
      Data.append("post", imgUpload)
      Data.append("postType","image")
    }
    if (videoUpload) {
      Data.append("post", videoUpload);
        Data.append("postType", "video");
    }
  
    
    
    createPost(Data).then((res) => {
      alert("Post created successfully");
      setShowSpinner(false)
      setImgUpload("");
      setVideoUpload("")
      setNewPostDescription("");
      setRefetchPost(true);
    
    }).catch((err) => {
      console.log(err);
      setShowSpinner(false)
      alert(err.response.data.message||err.message)
      })
  }

  return (
    <Card
      sx={{
        marginBottom: "0.5em",
        padding: "0.4rem",
        display: "flex",
        background: "white",
        borderRadius: "1rem",
        position: "relative",
      }}
    >
      <div>
        <Avatar
          img={JSON.parse(localStorage.getItem("authInfo"))?.profilePic}
          dim="45"
          userId={userId}
        />
      </div>
      <div className="w-100 mx-2">
        <form method="post" encType="multipart/form-data">
          <input
            className="m-1 p-2 form-control "
            type="text"
            placeholder="What's happening...."
            style={{ backgroundColor: "lightGray", outline: "none" }}
            value={newPostDescription}
            onChange={(e) => setNewPostDescription(e.target.value)}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            my={1}
          >
            <label htmlFor="imageFile">
              <div style={{ color: "purple" }}>
                <InsertPhotoIcon />
                <span className="mx-1">Photo</span>
              </div>
            </label>

            <input
              onChange={(e) => {
                if (videoUpload) {
                  setVideoUpload("");
                }

                if (e.target.files && e.target.files[0]) {
                  setImgUpload(e.target.files[0]);
                  e.target.value = "";
                }
              }}
              id="imageFile"
              type="file"
              name="post"
              className="d-none"
            />

            <label htmlFor="videoFile">
              {" "}
              <div style={{ color: "red" }}>
                <PlayCircleIcon />
                <span className="mx-1">video</span>
              </div>
            </label>

            <input
              onChange={(e) => {
                if (imgUpload) {
                  setImgUpload("");
                }

                if (e.target.files && e.target.files[0]) {
                  setVideoUpload(e.target.files[0]);
                }
                e.target.value = "";
              }}
              id="videoFile"
              type="file"
              name="post"
              className="d-none"
            />

            <div
              onClick={() => alert("Schedule feature is not created yet")}
              style={{ color: "blue" }}
            >
              <CalendarMonthIcon />
              <span className="mx-1">Schedule</span>
            </div>
            <div
              onClick={() =>
                alert("location sharing feature is not created yet")
              }
              style={{ color: "green" }}
            >
              <LocationOnIcon />
              <span className="mx-1">location</span>
            </div>
            <button
              type="submit"
              onClick={handlePostShare}
              className="btn btn-dark"
            >
              {showSpinner ? (
                <>
                  <span
                    className="spinner-border text-secondary mx-1 spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  uploading...
                </>
              ) : (
                "Share"
              )}
            </button>
          </Stack>
          {imgUpload && (
            <div>
              <ClearIcon
                onClick={() => {
                  setImgUpload("");
                }}
              />

              <img
                style={{
                  width: "100%",
                  maxHeight: "20rem",
                  borderRadius: "2%",
                  objectFit: "contain",
                }}
                src={URL.createObjectURL(imgUpload)}
                alt="postImg"
              />
            </div>
          )}
          {videoUpload && (
            <div className="d-flex">
              <ClearIcon
                onClick={() => {
                  setVideoUpload("");
                }}
              />
              <video controls style={{maxWidth:"40vw"}} width="100%"><source src={URL.createObjectURL(videoUpload)}></source></video>
            </div>
          )}
        </form>
      </div>
    </Card>
  );
}