import React,{useState,useEffect} from 'react'
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from '../apiCalls/usersApi';



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