import React,{useEffect} from 'react';
import { notifications } from "../utils/notifications";
import Avatar from "../components/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";

const NotificationsPage = () => {

  const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  return (
    <div className="min-vh-100  d-flex  justify-content-center">
      <div style={{background:"white",padding:"1em",minWidth:"50vw"}} >
        {notifications.map((notifi, i) =>
          <SingleNotification key={i} notification={notifi} val={i} />
        )}  
      </div>
    </div>
  );
}

export default NotificationsPage

let SingleNotification = ({ notification,val }) => {
  
  let unread=[3,5,8,2,9,4]
  
  return (
    <div
      style={{ background:unread.includes(val)?"rgb(243, 212, 212)":"rgb(239,238,212" }
              }
      className={`d-flex justify-content-between align-items-center p-2 m-2 rounded-4 `}
    >
      <div className="d-flex">
        <Avatar img={notification.profilePic} dim={30} />
        <span className="mx-2">{notification.msg}</span>
      </div>
      <div className="d-flex align-items-center">
        <span style={{fontSize:"13px",color:"gray",marginRight:"1em"}}>
         2h ago
      </span>
      <DeleteIcon className="pointer" />
      </div>

      
    </div>
  );
}