import React,{useState} from "react";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { Box, Stack, Badge } from "@mui/material";
import Sidebar from "./Sidebar";
import SearchBar from "./searchBar";
import HomeIcon from "@mui/icons-material/Home";
import GroupAddIcon from "@mui/icons-material/GroupAdd";;
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReorderIcon from "@mui/icons-material/Reorder";


const Navbar = () => {
  let NavigateTo = useNavigate();
  let [showSidebar,setShowSidebar]=useState(false)
  let login = false;
  return (
    <Stack
      direction="row"
      sx={{
        borderBottom: "1px solid white",
        minHeight: "4em",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "lightblue",
        zIndex: 988,
      }}
    >
      <Box px={1}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPHRvtFUvNT9Rrpz2HE4gu05hPPg8m7DweCg&usqp=CAU"
          alt="logo"
          width={50}
          style={{ borderRadius: "49%", margin: " 0.2rem" }}
          onClick={() => NavigateTo("/")}
        />

        <span className="appName ">Photo<b>Gram</b></span>
      </Box>

      <Box>
        <SearchBar />
      </Box>
      <NavIconContainer  NavigateTo={NavigateTo}/>
      <AuthBtns NavigateTo={NavigateTo} login={login} />
      <div className="mx-2 sidebar">
        <ReorderIcon onClick={() =>setShowSidebar(true)} />
       </div>
      <Sidebar AuthBtns={AuthBtns} showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
    </Stack>
  );
};

export default Navbar;

let NavIconContainer = ({ NavigateTo, sidebarData }) => {
  
  let {direction,navLabel,gap}= sidebarData||{};
  return (
    <div
      className={`${!direction && "mobFirst"}`}
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: "space-between",
        width: "20%",
      }}
    >
      <div className={`d-flex  m-${gap}`}>
        {" "}
        <HomeIcon
          onClick={() => NavigateTo("/")}
          className="navIcons fs-2 p-1 "
        />{" "}
        {direction && (
          <span className="mx-2 text-primary">{navLabel.home}</span>
        )}
      </div>

      <div className={`d-flex  m-${gap}`}>
        {" "}
        <GroupAddIcon className="navIcons fs-2 p-1" />
        {direction && (
          <span className="mx-2 text-primary">{navLabel.newFriend}</span>
        )}
      </div>

      <div className={`d-flex  m-${gap}`}>
        {" "}
        <Badge badgeContent={5} color="secondary">
          <NotificationsActiveIcon className="navIcons fs-2 p-1" />
        </Badge>{" "}
        {direction && (
          <span className="mx-2 text-primary">{navLabel.notify}</span>
        )}
      </div>

      <div className={`d-flex  m-${gap}`}>
        <Badge badgeContent="" variant="dot" color="primary">
          <ChatBubbleOutlineIcon className="navIcons fs-2 p-1" />
        </Badge>
        {direction && <span className="mx-2 text-primary">{navLabel.msg}</span>}
      </div>
    </div>
  );
}

let AuthBtns = ({NavigateTo,login,sidebar}) => {
  return (
    <div className={`p-2 ${!sidebar && "mobFirst"}`}>
      {login ? (
        <button className="m-1 btn btn-danger">logout</button>
      ) : (
        <>
          <button
            onClick={() => NavigateTo("/Auth/signup")}
            className="btn btn-primary m-1"
          >
            signup
          </button>
          <button className="btn btn-warning m-1">Login</button>
        </>
      )}
    </div>
  );
}  

 export { NavIconContainer, AuthBtns };
