import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUserDetails, uploadUserPics } from '../apiCalls/usersApi';



const UpdateInfoModal = ({ updateModal, setUpdateModal }) => {
  let userDetails = useSelector(state => state.authReducers);
  let [updateUser, setUpdateUser] = useState({})
  
 // useEffect hook 
  useEffect(() => {
    setUpdateUser(userDetails)
       
  }, [userDetails]);
  

// handle update user function  
  let handleUpdate =async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("pgmToken")) {
      alert("Please login first to update your details")
      return;
    }

    updateUserDetails(updateUser,updateUser._id).then((res) => {
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
            
          </div>
           
            <div className="d-flex m-3 justify-content-end">
              {" "}
              <button type="submit" className="btn btn-warning">
                Update Details
              </button>
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

const UploadAuthImgModal = ({editImages,setEditImages,userId}) => {
  let [authImgs, setAuthImgs] = useState({
    profilePic: "", coverPic: ""
  });
  let [confirm, setConfirm] = useState(false);


  let uploadAuthImages = (e) => {
    e.preventDefault();

    let { profilePic, coverPic } = authImgs;
  

    // authentication checking
     if (!localStorage.getItem("pgmToken")) {
       alert("Please login first to update your details");
       return;
    };
 
    // checkbox is clicked or not
    if (!confirm) {
         return alert("please confirm the checkbox")
    }

   // atleast one of the image has to be changed
    if (!(profilePic || coverPic)) {
      return alert("Please choose the images to be uploaded")
    }

    //calling the update function
    let data = new FormData(); 
     
    if (profilePic && coverPic) {
      data.append("auth", profilePic,"profilePic");
      data.append("auth", coverPic,"coverPic");
      
    } else if (profilePic) {
      data.append("auth", profilePic,"profilePic");
      
    } else {
      data.append("auth", coverPic,"coverPic");
    }
       
  
       uploadUserPics(data,userId)
         .then((res) => {
           console.log(res);
           setAuthImgs({ profilePic: "", coverPic: "" });
         })
      .catch((err) => console.log(err));
    
   
     
  }
  
  return (
    <Modal
      show={editImages}
      onHide={() => setEditImages(false)}
      centered
      backdrop="static"
    >
      <Modal.Body className="p-3">
        <form onSubmit={uploadAuthImages}>
          <p className="fw-bold text-primary p-2">
            Edit profile picture and cover image:
          </p>
          <div className="d-flex m-2">
            <div className="p-2">
              <label>Profile Image </label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => {
                  if (e.target.files ) {
                    setAuthImgs({ ...authImgs, profilePic: e.target.files[0] });
                   
                  }
                  
                }}
              />
            </div>
            <div className="p-2">
              {" "}
              <label> Cover Image</label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAuthImgs({ ...authImgs, coverPic: e.target.files[0] });
               }}}
              />
            </div>
          </div>
          <input
            type="checkbox"
            value={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
          />
          <span> please confirm that everything is okay</span>
          <div className="d-flex justify-content-end m-2">
            <button
              onClick={() => {
                setEditImages(false);
                setAuthImgs({profilePic:"", coverPic:""})
              }}
              className="btn btn-secondary m-1"
              type="button"
            >
              cancel
            </button>
            <button type="submit" className="btn btn-warning m-1">
              upload
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export { DeleteAccountModal,UploadAuthImgModal };