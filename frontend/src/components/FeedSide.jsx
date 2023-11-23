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


const FeedSide = ({profile}) => {
  let [imgUpload, setImgUpload] = useState("");
 
  
  return (
    <Box mx={1} py={1} sx={{ minHeight: "100vh" }}>
      <Card
        sx={{
          marginBottom: "0.5em",
          padding: "0.4rem",
          display: "flex",
          background: "white",
          borderRadius: "1rem",
          
        }}
      >
        <div>
          <Avatar img="/profile Img.png" dim="45"/>
        </div>
        <div className="w-100 mx-2">
          <input
            className="m-1 p-2 rounded w-100 border-0  "
            type="text"
            placeholder="What's happening...."
            style={{ backgroundColor: "lightGray", outline: "none" }}
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
                if (e.target.files && e.target.files[0]) {
                  setImgUpload(URL.createObjectURL(e.target.files[0]));
                  e.target.value = "";
                }
              }}
              id="imageFile"
              type="file"
              className="d-none"
            />
            <div style={{ color: "red" }}>
              <PlayCircleIcon />
              <span className="mx-1">video</span>
            </div>
            <div style={{ color: "blue" }}>
              <CalendarMonthIcon />
              <span className="mx-1">Schedule</span>
            </div>
            <div style={{ color: "green" }}>
              <LocationOnIcon />
              <span className="mx-1">location</span>
            </div>
            <button className="btn btn-dark">Share</button>
          </Stack>
        </div>
      </Card>

      {imgUpload && (
        <div>
          <ClearIcon className="" onClick={() => setImgUpload("")} />
          <img
            style={{
              width: "100%",
              maxHeight: "20rem",
              objectFit: "cover",
              borderRadius: "2%",
            }}
            src={imgUpload}
            alt="postImg"
          />
        </div>
      )}

      {profile &&
        <Typography variant="h6" m={3}>
          <span className="text-danger mx-1"><SendIcon /></span> Your Posts
      </Typography>}

      <PostContainer  />
    </Box>
  );
}

export default FeedSide