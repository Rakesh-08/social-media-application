import React,{useState,useEffect} from 'react'
import followersList  from "../utils/followersData";
import { Card, Box,Typography } from "@mui/material";
import Avatar from "./Avatar";
import UsersListModal from './UsersListModal';
import { fetchAllUsers, followUnfollowUser } from '../apiCalls/usersApi';


const FollowersCard = ({sliced,heading,query,userIdForFollower}) => {
 
  let [usersModal, setUsersModal] = useState(false);
  let [users, setUsers] = useState([]);
  let userId = JSON.parse(localStorage.getItem("authInfo"))?._id;
 
  useEffect(() => {
  

  if (!localStorage.getItem("pgmToken")||!userIdForFollower) {
      setUsers(followersList)   
  } else {
    getAllUsers(userIdForFollower);
    
    }
    
  }, [userIdForFollower,localStorage.getItem("pgmToken")]);
  
   
  let getAllUsers = (id) => {

    fetchAllUsers(query,id).then((res) => {
      setUsers(res.data)
    }).catch((err) => {
     console.log(err)
    });
  }


  return (
    <div className={`mx-3  ${sliced && "mobFirst1"} `}>
      {" "}
      <Typography sx={{ fontWeight: "bold" }} my={2}>
        {heading}
      </Typography>
      {users.length > 0 ? (
        <Card
          sx={{
            width: "100%",
            padding: "1em",
            background:"linear-gradient(49deg,white,gray)"
          }}
        >
          {users
            .filter((user) =>
              user[query] ? user[query].includes(userIdForFollower) : true
            )
            .slice(0, sliced)
            .map((follower, i) => {
              if (
                userId &&
                follower._id == userId &&
                follower._id == userIdForFollower
              ) {
                return;
              }

              return (
                <User
                  user={follower}
                  key={follower._id}
                  query={query}
                  userId={userId}
                />
              );
            })}

          {sliced && (
            <div className="d-flex justify-content-center">
              <p onClick={() => setUsersModal(true)} className=" text-primary  m-1 pointer">
                show more
              </p>
            </div>
          )}
        </Card>
      ) : (
        <p>
          You have not socialized with peoples, try to connect with peoples{" "}
        </p>
      )}
      <UsersListModal
        usersModal={usersModal}
        setUsersModal={setUsersModal}
        userId={userId}
      />
    </div>
  );
}

const User = ({ user,query,userId}) => {
  let [follow, setFollow] = useState(false);

  useEffect(() => {

    if (userId) {
      if (user.followers&&user.followers.includes(userId)) {
           setFollow(true)
    }
    }
    
    
  }, [query]);
    
  let followUnfollowAction = () => {
     setFollow(!follow)
    if (!localStorage.getItem("pgmToken")) {
       
         return;
    };

    if (follow) {
         //unfollow action 
       followUnfollowUser(user._id,"unfollow")
         .then((res) => {
           setFollow(!follow);
           if (res.data.username) {
             
           localStorage.setItem("authInfo",JSON.stringify(res.data))
           }
         })
         .catch((err) => {
           console.log(err);
         });
        
    } else {
      // follow action
      followUnfollowUser(user._id,"follow").then((res) => {
        setFollow(!follow);
         localStorage.setItem("authInfo", JSON.stringify(res.data));
      }).catch(err => {
        console.log(err);
      })
      
    }

  }
  return (
    <Box
            display="flex"
            alignItems="center"
      justifyContent="space-between"
           
          >
            <div className="m-1 d-flex ">
              <Avatar img={user.profilePic} dim="45" userId={user._id} />
              <div className="m-1 mx-2 d-flex flex-column ">
                <span className="fw-bold"> {user.name}</span>
                <span>@{user.username}</span>
              </div>
            </div>

            <div className="m-1">
              <button onClick={followUnfollowAction} className={`btn  ${follow ? "btn-outline border-success ":"btn-success "}`}>{follow ? "Unfollow" : "Follow"}</button>
              
            </div>
          </Box>
    
  )
}

export default FollowersCard