import React,{useEffect,useState} from 'react';
import { notifications as dummyNoti } from "../utils/notifications";
import Avatar from "../components/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";
import { deleteNotification,changeSeenStatus,fetchAllNotifications} from '../apiCalls/notificationApis';

const NotificationsPage = () => {
  
  let [notifications,setNotifications] = useState([])
  const { pathname } = useLocation();
  let id = JSON.parse(localStorage.getItem("authInfo"))?._id;

  useEffect(() => {
    if (localStorage.getItem("pgmToken")) {
      fetchNotificationsAndUpdateStatus()
    } else {
      setNotifications(dummyNoti)
    }
  },[])

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

  
  let fetchNotificationsAndUpdateStatus = async() => {
    fetchAllNotifications().then((res) => {
      setNotifications(res.data)
      
       let ids=[]
       res.data?.map(noti => {
         if (!noti.seen.includes(id)) {
           ids.push(noti._id);
            }
       })
     
      if (ids.length > 0) {
          changeSeenStatus({ids})
      }
    }).catch(err => console.log(err));
   
  }

  let deleteFn = async (id) => {
    
    deleteNotification(id).then(res => {
      console.log(res);
     fetchNotificationsAndUpdateStatus()})
      .catch(err => console.log(err));
  }
  
  return (
    <div className="min-vh-100  d-flex  justify-content-center ">

     {notifications.length == 1?
        <div className="display-5">
          You don't have any notifications
      </div>:<div
        style={{
          background: "white",
            padding: "1em",
            minWidth: "23rem",
            width:"50%",
          boxShadow: "0.3rem 0.3rem 0.5em ",
        }}
      >
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "1em",
              height: "1em",
              backgroundColor: "rgb(243, 212, 112)",
              borderRadius: "1em",
            }}
          ></div>
          <div className="mx-2">seen</div>
            
          <div
            style={{
              width: "1em",
              height: "1em",
              backgroundColor: "rgb(239,238,212)",
              borderRadius: "1em",
            }}
          ></div>
          <div className="mx-2">unseen</div>
        </div>

          {notifications.map((notifi, i) => (
          <SingleNotification key={i} notification={notifi} deleteFn={deleteFn} userId={id} val={i} />
          ))}
        
      </div>}
      
     
    </div>
  );
}

export default NotificationsPage

let SingleNotification = ({ notification,deleteFn,userId,val }) => {
  
  let convrersionFn = (date) => {
     let temp = new Date(date).getTime();
    let curr = Date.now();
    let result = "";
    let base= Math.floor((curr-temp)/1000)

    if (base < 60) {
      result = `${Math.floor(base)}s`;
    } else if (base < 3600) {
      result = `${Math.floor(base/60)}m`;
    } else if (base < 216000) {
      result = `${Math.floor(base/(60*60))}h`;
    } else {
        result =  `${Math.floor(base/(60*60*24))}days`;
    }

    return result
  }
  let read = [2, 4, 5, 7, 1, 9, 11];
  
  return (
    <div
      style={{
        backgroundColor: `${
          notification.seen?.includes(userId)||read.includes(val)
            ? "rgb(243, 212, 112)"
            : "rgb(239,238,212)"
        }`,
      }}
      className={`d-flex justify-content-between align-items-center p-2 m-2 rounded-4 `}
    >
      <div className="d-flex">
        <Avatar img={notification.senderImage} dim={30} />
        <span className="mx-2">{notification.msg}</span>
      </div>
      <div className="d-flex align-items-center">
        <span style={{ fontSize: "13px", color: "gray", marginRight: "1em" }}>
          { notification._id?convrersionFn(notification.createdAt):"2h"} ago
        </span>
        <DeleteIcon
          onClick={() => deleteFn(notification._id)}
          className="pointer"
        />
      </div>
    </div>
  );
}