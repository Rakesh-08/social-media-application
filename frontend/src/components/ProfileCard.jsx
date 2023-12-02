import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, CardMedia, CardContent } from "@mui/material"
import dummyUser from '../utils/dummyUser';
import { UploadAuthImgModal } from './UpdateInfoModal';


const ProfileCard = ({ data,user }) => {

  let [editImages, setEditImages] = useState(false);

   let dispatch = useDispatch()
let loggedUserId = JSON.parse(localStorage.getItem("authInfo"))?._id;

   let showProfile = () => {
     dispatch({
       type: "otherProfile",
       userId: loggedUserId,
     });
   };
 
  return (
    <Card
        sx={{
        width:"100%",
        boxShadow: "none",
        borderRadius: "2em",
        marginBottom: "1em",
        marginTop: "0.3em",
        marginLeft: "0.2em",
        height:data?.height
      }}
     
    >
      <CardMedia
        image={user?.coverPic||dummyUser.coverPic}
        alt={"coverPhoto"}
        sx={{ width: "100%", height: data?.coverPhotoHeight || 120 }}
      ></CardMedia>
      <CardMedia
        image={user?.profilePic||dummyUser.profilePic}
        alt={"profileImg"}
        sx={{
          width: data?.dim || 100,
          height: data?.dim || 100,
          borderRadius: "50%",
          margin: "auto",
          marginTop: "-12%",
          position:"relative",
        }}
      >
        {(data?.profile && loggedUserId==user._id)&&
        
          <img src="https://logowik.com/content/uploads/images/888_edit.jpg" alt="edit profile or cover image" height={30} className="rounded bottom-0 position-absolute end-0 pointer" onClick={() => {
          if (!localStorage.getItem("pgmToken")) {
              return alert ("Please login first to change profile and cover image")
            }
            setEditImages(true)
          }} />
        }
        
      </CardMedia>

      <CardContent sx={{ width:"100%", height: "fit-content" }}>
        <div className="text-center">
          <h6 className="fw-bold">{user?.firstName} {user?.lastName}</h6>
          <h6>{`${user?.about || "write about you"}`}</h6>
          <hr />
          <div className="d-flex  justify-content-evenly  ">
            <div>
              <h6 className="fw-bold">{user?.followers?.length}</h6>
              <p className="mb-0">Followers</p>
            </div>

            <div>
              <h6 className="fw-bold">{user?.following?.length}</h6> <p className="mb-0">Following</p>
            </div>
            {data?.profile && (
              <div>
                <h6 className="fw-bold">{user?.posts?.length}</h6> <p className="mb-0">Posts</p>
              </div>
            )}
          </div>
          <hr />
          {!data?.profile && (
            <Link style={{ textDecoration: "none" }} to="/profile">
              <span onClick={showProfile} className="text-warning fw-bold pointer ">
                View Profile
              </span>
            </Link>
          )}
        </div>
      </CardContent>
      <UploadAuthImgModal editImages={editImages}  setEditImages={setEditImages} userId={user?._id} />
    </Card>
  );
}

export default ProfileCard