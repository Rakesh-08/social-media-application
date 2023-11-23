import React from 'react'
import { Modal } from "react-bootstrap";

const UpdateInfoModal = ({ updateModal, setUpdateModal }) => {
    
  return (
    <Modal
      show={updateModal}
      onHide={() => setUpdateModal(false)}
      centered
      size="lg"
    >
      {" "}
      <Modal.Header className="fw-bold fs-5 " closeButton>
        Your information
      </Modal.Header>
      <Modal.Body >
              <form >
                  <div className="updateModal">
          <div>
            <label>First Name</label>
            <input type="text" className="form-control" />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" className="form-control" />
          </div>
          <div>
            <label>Profession</label>
            <input type="text" className="form-control" />
          </div>
          <div>
            <label>Working at</label>
            <input type="text" className="form-control" />
          </div>
          <div className="stay">
            <label>Stays In </label>
            <input type="text" className="form-control" />
          </div>
          <div>
            <label>Relationship Status</label>
            <input type="text" className="form-control" />
          </div>

          <div>
            <label>Contact </label>
            <input type="text" className="form-control" />
          </div>
          <div>
            <label>Profile pic</label>
            <input type="file" className="form-control" />
          </div>
          <div>
            <label>Cover image</label>
            <input type="file" className="form-control" />
                  </div>
                  </div>
          <div className="m-2">
            <input type="checkbox" />
                      <span> Have you read the above details carefully</span>
                      <div className="d-flex justify-content-end">  <button className="btn btn-warning">Update Details</button></div>
                  </div>
                
         
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateInfoModal