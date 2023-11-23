import React from 'react'
import { Link } from "react-router-dom"
import { Card, CardMedia, CardContent } from "@mui/material"



const ProfileCard = ({ data }) => {
  return (
    <Card
      sx={{
        width:"100%",
        boxShadow: "none",
        borderRadius: "2em",
        marginBottom: "1em",
      }}
      // className={`${!data && "mobFirst"}`}
    >
      <CardMedia
        image={
          "https://img.pikbest.com/origin/09/20/32/51npIkbEsTAyu.jpg!w700wp"
        }
        alt={"coverPhoto"}
        sx={{ width: "100%", height: data?.coverPhotoHeight || 120 }}
      ></CardMedia>
      <CardMedia
        image={"/profile Img.png"}
        alt={"profileImg"}
        sx={{
          width: data?.dim || 100,
          height: data?.dim || 100,
          borderRadius: "50%",
          margin: "auto",
          marginTop: "-10%",
        }}
      ></CardMedia>

      <CardContent sx={{ width:"100%", height: "fit-content" }}>
        <div className="text-center">
          <h6 className="fw-bold">Rakesh Mandal</h6>
          <h6>Software Developer</h6>
          <hr />
          <div className="d-flex  justify-content-evenly  ">
            <div>
              <h6 className="fw-bold">805</h6>
              <p className="mb-0">Followers</p>
            </div>

            <div>
              <h6 className="fw-bold">188</h6> <p className="mb-0">Following</p>
            </div>
            {data?.profile && (
              <div>
                <h6 className="fw-bold">7</h6> <p className="mb-0">Posts</p>
              </div>
            )}
          </div>
          <hr />
          {!data?.profile && (
            <Link style={{ textDecoration: "none" }} to="/profile">
              <span className="text-warning fw-bold pointer ">
                View Profile
              </span>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard