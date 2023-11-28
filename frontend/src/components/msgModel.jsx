import React, { useState } from 'react';
import { Modal } from "react-bootstrap"

const msgModel = ({ msg }) => {
    let [show,setShow]=useState(false)
  return (
      <div>
          <Modal
              show={true}
              onHide={show}
              backdrop="static"
          
          >
              <Modal.Body className="p-2 ">
                  <p className="m-2">{msg}</p>
                  <p  className="text-center"><button onClick={()=>setShow(false)} className="btn btn-primary">Ok</button></p>
              </Modal.Modal.Body>
          </Modal>
          
    </div>
  )
}

export default msgModel