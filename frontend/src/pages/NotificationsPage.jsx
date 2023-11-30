import React from 'react';
import { notifications } from "../utils/notifications";
import Avatar from "../components/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";

const NotificationsPage = () => {
  return (
    <div className="min-vh-100  d-flex  justify-content-center">
      <div style={{background:"white",padding:"1em",minWidth:"50vw"}} >
        {notifications.map((notifi, i) =>
          <SingleNotification key={i} notification={notifi} />
        )}  
      </div>
    </div>
  );
}

export default NotificationsPage

let SingleNotification = ({notification}) => {
  
  return (
    <div
      style={{ background: "rgb(443, 212, 212)" }}
      className="d-flex justify-content-between align-items-center p-2 m-2 rounded-4"
    >
      <div className="d-flex">
        <Avatar img={notification.profilePic} dim={30} />
        <span className="mx-2">{notification.msg}</span>
      </div>
      <div className="d-flex align-items-center">
        <span style={{fontSize:"13px",color:"gray",marginRight:"1em"}}>
        {notification.createdAt}m{" "}
      </span>
      <DeleteIcon className="pointer" />
      </div>

      
    </div>
  );
}