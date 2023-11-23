import React from "react";
import { Modal } from "react-bootstrap";
import FollowersCard from "./FollowersCard";

const UsersListModal = ({ usersModal,setUsersModal }) => {
  return (
    <Modal
      show={usersModal}
      onHide={() => setUsersModal(false)}
      centered
      scrollable={true}
    >
          <Modal.Body>
        <FollowersCard ListModal={true} />
        
      </Modal.Body>
    </Modal>
  );
};

export default UsersListModal
