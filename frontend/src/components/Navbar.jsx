import React,{useState,useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllNotifications } from "../apiCalls/notificationApis";
import { Box, Stack, Badge } from "@mui/material";
import SearchBar from "./SearchBar";
import HomeIcon from "@mui/icons-material/Home";
import GroupAddIcon from "@mui/icons-material/GroupAdd";;
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReorderIcon from "@mui/icons-material/Reorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const Navbar = () => {
  let NavigateTo = useNavigate();
  let [showSidebar, setShowSidebar] = useState(false)

 
  return (
    <Stack
      direction="row"
      sx={{
        minHeight: "4em",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", 
      }}
      
    >
      <Box px={1}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPHRvtFUvNT9Rrpz2HE4gu05hPPg8m7DweCg&usqp=CAU"
          alt="logo"
          width={50}
          style={{ borderRadius: "49%", margin: " 0.2rem" }}
          onClick={() => NavigateTo("/home")}
        />

        <span className="appName ">Photo<b>Gram</b></span>
      </Box>

      <Box>
        <SearchBar />
      </Box>
      
        <NavIconContainer  mobileView={false}  />
       
       <AuthBtns NavigateTo={NavigateTo} />
     
    
    </Stack>
  );
};

export default Navbar;

let NavIconContainer = ({ mobileView }) => {
  let location = useLocation();
  let dispatch = useDispatch();
  let NavigateTo = useNavigate();
  
    let [newNotifications, setNewNotifications] = useState(null);
  

  useEffect(() => {
    if (localStorage.getItem("pgmToken")) {
           newNoti()
    } else {
      setNewNotifications(12)
    }
    }, [location]);

  let loggedUserId = JSON.parse(localStorage.getItem("authInfo"))?._id;

  let newNoti = () => {
    fetchAllNotifications().then((res) => {
      let temp = res.data?.filter(noti => !noti.seen.includes(loggedUserId));
      setNewNotifications(temp.length);
    }).catch(err => console.log(err));
  }

  let navAction = (path) => {
    NavigateTo(path); 
  }
  
  
 
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        minWidth: "25%",
      }}
      className={`${mobileView?"p-3":"mobFirst"} mx-2`}
    >
      <div className={`d-flex`}>
        {" "}
        <HomeIcon
          onClick={() => {
            navAction("/home");
          }}
          className={`navIcons ${
            location.pathname == "/home" && "bg-secondary rounded"
          } fs-1 p-1`}
        />{" "}
      </div>

      <div className={`d-flex `}>
        {" "}
        <GroupAddIcon
          onClick={() => {
            navAction("/users");
          }}
          className={`navIcons ${
            location.pathname == "/users" && "bg-secondary rounded"
          } fs-1 p-1`}
        />
      </div>

      <div className={`d-flex `}>
        {" "}
        <Badge badgeContent={newNotifications} color="secondary">
          <NotificationsActiveIcon
            onClick={() => {
              navAction("/notifications");
            }}
            className={`navIcons ${
              location.pathname == "/notifications" && "bg-secondary rounded"
            } fs-1 p-1`}
          />
        </Badge>{" "}
      </div>

      <div className={`d-flex `}>
        <Badge badgeContent="" variant="dot" color="primary">
          <ChatBubbleOutlineIcon
            onClick={() => {
              navAction("/messages");
            }}
            className={`navIcons ${
              location.pathname == "/messages" && "bg-secondary rounded"
            } fs-1 p-1`}
          />
        </Badge>
      </div>

      <div className={`d-flex`}>
        {" "}
        <AccountCircleIcon
          onClick={() => {
            dispatch({
              type: "otherProfile",
              userId: loggedUserId,
            });
            navAction("/profile");
          }}
          className={`navIcons ${
            location.pathname == "/profile" && "bg-secondary rounded"
          } fs-1 p-1`}
        />{" "}
      </div>
    </div>
  );
}

let AuthBtns = ({ NavigateTo}) => {
  
  let login= localStorage.getItem("pgmToken")
  return (
    <div>
      {login ? (
        <button
          onClick={() => {
            let confirmation = window.confirm(
              "Are you sure you want to log Out?"
            );
            if (confirmation) {
              localStorage.clear();
              NavigateTo("/Auth/login");
            }
          }}
          className="m-1 btn  btn-danger"
        >
          logout
        </button>
      ) : (
        <div className="d-flex mobFirst flex-wrap align-items-center justify-content-center">
          <button
            onClick={() => {
              NavigateTo("/Auth/signup");
            }}
            style={{ minWidth: "4.1em" }}
            className="btn btn-sm btn-primary m-1"
          >
            signup
          </button>
          <button
            style={{ minWidth: "4.1em" }}
            onClick={() => NavigateTo("/Auth/login")}
            className="btn  btn-sm btn-warning m-1"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}  

 export { NavIconContainer, AuthBtns };
