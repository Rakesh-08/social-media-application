import React,{useState} from 'react'
import FollowersCard from "../components/FollowersCard"

const UsersPage = () => {
  let [route,setRoute]=useState("new")
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
            route == "followers" && "text-primary fw-bold border-bottom border-2"
          } pointer`}
          onClick={() => setRoute("followers")}
        >
          Followers
        </p>
        <p
          className={`p-2 ${
            route == "following" && "text-primary fw-bold border-bottom border-2"
          } pointer`}
          onClick={() => setRoute("following")}
        >
          Following
        </p>
      </div>
      <div className="px-1"><FollowersCard query={route} /></div>
      
    </div>
  );
}

export default UsersPage