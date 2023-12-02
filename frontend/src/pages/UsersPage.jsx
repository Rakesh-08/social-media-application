import React,{useState,useEffect} from 'react'
import FollowersCard from "../components/FollowersCard"
import { useLocation } from "react-router-dom";

const UsersPage = () => {
  let [route, setRoute] = useState("new");
  const { pathname } = useLocation();
  let id = JSON.parse(localStorage.getItem("authInfo"))?._id;
  
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
  return (
    <div className="min-vh-100 d-flex flex-column ">
      <div className="d-flex m-2 border-bottom   justify-content-around">
        
        <p
          className={`p-2 ${
            route == "new" && "text-primary fw-bold border-bottom border-2"
          } pointer`}
          onClick={() => setRoute("new")}
        >
          Users
        </p>
        <p
          className={`p-2 ${
            route == "following" && "text-primary fw-bold border-bottom border-2"
          } pointer`}
          onClick={() => setRoute("following")}
        >
          Followers
        </p>
        <p
          className={`p-2 ${
            route == "followers" && "text-primary fw-bold border-bottom border-2"
          } pointer`}
          onClick={() => setRoute("followers")}
        >
          Following
        </p>
      </div>
      <div className="px-1"><FollowersCard query={route} userIdForFollower={id} /></div>
      
    </div>
  );
}

export default UsersPage