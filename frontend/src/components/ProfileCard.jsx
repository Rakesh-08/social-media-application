import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import { Card, CardMedia, CardContent } from "@mui/material"
import dummyUser from '../utils/dummyUser'



const ProfileCard = ({ data }) => {

  let [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("authInfo")) {
         setUser( JSON.parse( localStorage.getItem("authInfo")));
    } else {
          setUser(dummyUser)
     }
  }, [localStorage.getItem("authInfo")]);
  
  

  return (
    <Card
        sx={{
        width:"100%",
        boxShadow: "none",
        borderRadius: "2em",
        marginBottom: "1em",
        marginTop: "0.3em",
        marginLeft:"0.2em",
      }}
     
    >
      <CardMedia
        image={user.coverPic||dummyUser.coverPic}
        alt={"coverPhoto"}
        sx={{ width: "100%", height: data?.coverPhotoHeight || 120 }}
      ></CardMedia>
      <CardMedia
        image={user.profilePic||dummyUser.profilePic}
        alt={"profileImg"}
        sx={{
          width: data?.dim || 100,
          height: data?.dim || 100,
          borderRadius: "50%",
          margin: "auto",
          marginTop: "-12%",
        }}
      ></CardMedia>

      <CardContent sx={{ width:"100%", height: "fit-content" }}>
        <div className="text-center">
          <h6 className="fw-bold">{user.firstName} {user.lastName}</h6>
          <h6>{`${user.about || dummyUser.about}`}</h6>
          <hr />
          <div className="d-flex  justify-content-evenly  ">
            <div>
              <h6 className="fw-bold">{user.followers?.length}</h6>
              <p className="mb-0">Followers</p>
            </div>

            <div>
              <h6 className="fw-bold">{user.following?.length}</h6> <p className="mb-0">Following</p>
            </div>
            {data?.profile && (
              <div>
                <h6 className="fw-bold">{user.posts?.length}</h6> <p className="mb-0">Posts</p>
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