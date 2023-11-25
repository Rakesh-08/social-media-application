import React,{useState} from 'react'
import followersList from "../utils/followersData";
import { Card, Box,Typography } from "@mui/material";
import Avatar from "./Avatar";
import UsersListModal from './UsersListModal';

const FollowersCard = ({ profile,ListModal }) => {
 
  let [usersModal,setUsersModal]=useState(false)
  
  let list;
  if (profile) {
    list= followersList.slice(0, 4)
  } else if (ListModal) {
    list= followersList
  } else {
   list= followersList.slice(0, 2)
  }
     
  return (
    <div className={`mx-3 mobFirst1 `}>
      {" "}
      <Typography sx={{ fontWeight: "bold" }} my={2}>
        
          Who is following you
      </Typography>
      <Card
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
          padding: "1em",
        }}
      >
        {list.map((follower, i) => (
          <User follower={follower} key={i} />
        ))}
        {!ListModal && <div className="d-flex justify-content-center">
          <p onClick={() => setUsersModal(true)} className="   m-1 pointer">
            show more
          </p></div>}
       
      </Card>
      <UsersListModal usersModal={usersModal} setUsersModal={setUsersModal} />

    </div>
  );
}

const User = ({ follower }) => {
    let [follow, setFollow] = useState(false);
  return (
    <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
           
          >
            <div className="m-1 d-flex ">
              <Avatar img={follower.img} dim="45" />
              <div className="m-1 mx-2 d-flex flex-column ">
                <span className="fw-bold"> {follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>

            <div className="m-1">
              <button onClick={()=>setFollow(!follow)} className={`btn  ${follow ? "btn-outline border-success ":"btn-success "}`}>{follow ? "Unfollow" : "Follow"}</button>
              
            </div>
          </Box>
    
  )
}

export default FollowersCard