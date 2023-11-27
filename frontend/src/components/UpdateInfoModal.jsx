import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUserDetails } from '../apiCalls/usersApi';



const UpdateInfoModal = ({ updateModal, setUpdateModal }) => {
  let userDetails = useSelector(state => state.authReducers);
  let [updateUser, setUpdateUser] = useState({})
  
  useEffect(() => {
     setUpdateUser(userDetails)
       
  },[userDetails])

  let handleUpdate = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("pgmToken")) {
      alert("Please login first to update your details")
      return;
    }
    if (!updateUser.confirmation) {
      alert("Please confirm that you have read the details carefully ");
      return;
     }
   

    updateUserDetails(updateUser).then((res) => {
      setUpdateModal(false);
      
      localStorage.setItem("authInfo",JSON.stringify(res.data))
    }).catch((err) =>
    {
      console.log(err)
      alert(err.data.message)
    });
  }

  let handleOnChange = (e) => {
       setUpdateUser({...updateUser,[e.target.name]:e.target.value})
  }
  return (
    <Modal
      show={updateModal}
      onHide={() => setUpdateModal(false)}
      centered
      size="lg"
      backdrop="static"
    >
      {" "}
      <Modal.Header className="fw-bold fs-4 " closeButton>
        Your information
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleUpdate}>
          <div className="updateModal">
            <div>
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={updateUser.firstName}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={updateUser.lastName}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>About</label>
              <input
                type="text"
                className="form-control"
                name="about"
                value={updateUser.about}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>Working at</label>
              <input
                type="text"
                className="form-control"
                name="workAt"
                value={updateUser.workAt}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="stay">
              <label>Stays In </label>
              <input
                type="text"
                className="form-control"
                name="staysIn"
                value={updateUser.staysIn}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>Relationship Status</label>
              <input
                type="text"
                className="form-control"
                name="Status"
                value={updateUser.Status}
                onChange={(e) => handleOnChange(e)}
              />
            </div>

            <div>
              <label>Contact </label>
              <input
                type="text"
                className="form-control"
                name="contact"
                value={updateUser.contact}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>Profile pic</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  if (e.target.files) {
                       setUpdateUser({...updateUser,profilePic:e.target.files[0]}) 
                  }
                }}
              />
            </div>
            <div>
              <label>Cover image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  if (e.target.files) {
                     setUpdateUser({...updateUser,coverPic:e.target.files[0]})
                  }
                }}
              />
            </div>
          </div>
          <div className="m-2">
            <input type="checkbox" value={updateUser.confirmation} onChange={(e)=> setUpdateUser({...updateUser,confirmation:e.target.checked})} />
            <span> Have you read the above details carefully</span>
            <div className="d-flex justify-content-end">
              {" "}
              <button type="submit" className="btn btn-warning">
                Update Details
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateInfoModal


const DeleteAccountModal = ({openDeleteModal,setOpenDeleteModal,username,userId }) => {
     
  let [showMsg, setShowMsg] = useState(false);
  let NavigateTo = useNavigate();


  let handleDeleteAccount = (e) => {
    e.preventDefault();

     if (!localStorage.getItem("pgmToken")) {
       alert("Please login first to delete your account");
       return;
     }
 
    if (e.target[0].value !== username) {
      setShowMsg(true)
        return
    } 

      deleteUser(userId)
        .then((res) => {
          alert(res.data.message)
          localStorage.clear();
          NavigateTo("/Auth/signup")
        }).catch((err) => {
          console.log(err);
          alert(err.response.data.message)
        })
      
    
    
  }
  return (
    <Modal
      show={openDeleteModal}
      onHide={() => setOpenDeleteModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Body className="p-3">
        <form onSubmit={handleDeleteAccount}>
          <label>Enter your username to confirm </label>
          <input className="form-control" type="text" />
          {showMsg && <p className="text-danger">*username is incorrect</p>}

          <div className="d-flex justify-content-end m-2">
            <button type="submit" className="btn btn-outline-primary m-1">
              confirm
            </button>
            <button
              type="button"
              onClick={() => setOpenDeleteModal(false)}
              className="btn btn-outline-danger m-1"
            >
              cancel
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export { DeleteAccountModal };