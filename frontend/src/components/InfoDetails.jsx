import React,{useState,useEffect} from 'react'
import { Card } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import UpdateInfoModal, { DeleteAccountModal } from './UpdateInfoModal';
import dummyUser from "../utils/dummyUser";




const InfoDetails = ({width,user}) => {
  let [updateModal, setUpdateModal] = useState(false)
  let [openDeleteModal, setOpenDeleteModal] = useState(false)
  

 let loggedUserId = JSON.parse(localStorage.getItem("authInfo"))?._id;
  
  let openUpdateModal = () => {
    setUpdateModal(true)
  };
 
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
      {loggedUserId == user._id && (
        <div className="d-flex justify-content-between my-2">
          <span className="fw-bold fs-5">Your info </span>
          <span>
            <EditIcon onClick={openUpdateModal} className="pointer" />
          </span>
        </div>
      )}

      <div>
        <b> Status</b>
        <span> {user?.Status}</span>
      </div>
      <div>
        <b>Stays in</b>
        <span> {user?.staysIn}</span>
      </div>
      <div>
        <b>Work at</b>
        <span> {user?.workAt}</span>
        <div>
          <b>Contact @</b>
          <span>{user?.contact}</span>
        </div>

        {loggedUserId == user._id &&<div className="my-2">
          <span
            onClick={() => setOpenDeleteModal(true)}
            className="pointer text-danger border-bottom border-2 border-danger"
          >
            {" "}
            Delete Account
          </span>
        </div>}
        
      </div>
      <UpdateInfoModal
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        userDetails={user}
      />
      <DeleteAccountModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        username={user?.username}
        userId={user?._id}
      />
    </Card>
  );
}

export default InfoDetails