import React,{useState} from 'react'
import { Card } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import UpdateInfoModal from './UpdateInfoModal';

const InfoDetails = () => {
  let [updateModal, setUpdateModal] = useState(false)
  return (
    <Card
      sx={{
        width: "70%",
        height: "fit-content",
        borderRadius: "1em",
        margin: "1em",
        padding: "1em",
      }} 
      className="mobFirst"
    >
      <div className="d-flex justify-content-between my-2">
        <span className="fw-bold fs-5">Your info </span>
        <span>
          <EditIcon onClick={()=>setUpdateModal(true)} className="pointer" />
        </span>
      </div>
      <div>
        <b>Status</b>
        <span> in relationship</span>
      </div>
      <div>
        <b>Stays in</b>
        <span> Delhi, 110094</span>
      </div>
      <div>
        <b>Work at</b>
        <span> Microsoft</span>
        <div>
          <b>Contact @</b>
          <span> 8448746347</span>
        </div>
      </div>
      <UpdateInfoModal updateModal={updateModal} setUpdateModal={setUpdateModal} />

    </Card>
  );
}

export default InfoDetails