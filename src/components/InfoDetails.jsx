import React,{useState,useEffect} from 'react'
import { Card } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import UpdateInfoModal from './UpdateInfoModal';
import dummyUser from "../utils/dummyUser";
import { useDispatch } from "react-redux";


const InfoDetails = ({width}) => {
  let [updateModal, setUpdateModal] = useState(false)
  let [user, setUser] = useState({});
  let dispatch = useDispatch();
  
   useEffect(() => {
     if (localStorage.getItem("authInfo")) {
       setUser(JSON.parse(localStorage.getItem("authInfo")));
     } else {
       setUser(dummyUser);
     }
   }, [localStorage.getItem("authInfo")]);
  
  let openUpdateModal = () => {
      
   
    dispatch({
      type: "updateInfo",
      payload:user
      })
    setUpdateModal(true)
  }
  return (
    <Card
      sx={{
        width: width || "70%",
        height: "fit-content",
        borderRadius: "1em",
        margin: "1em",
        padding: "1em",
      }}
      className={width ? "sidebar" : "mobFirst"}
    >
      <div className="d-flex justify-content-between my-2">
        <span className="fw-bold fs-5">Your info </span>
        <span>
          <EditIcon onClick={openUpdateModal} className="pointer" />
        </span>
      </div>
      <div>
        <b> Status</b>
        <span> {user.Status}</span>
      </div>
      <div>
        <b>Stays in</b>
        <span> {user.staysIn}</span>
      </div>
      <div>
        <b>Work at</b>
        <span> {user.workAt}</span>
        <div>
          <b>Contact @</b>
          <span>{user.contact}</span>
        </div>
        <div className="my-2" >
          <span className="pointer text-danger border-bottom border-2 border-danger"> Delete Account</span>
          
        </div>
      </div>
      <UpdateInfoModal
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
      />
    </Card>
  );
}

export default InfoDetails