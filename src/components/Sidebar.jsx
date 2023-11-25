import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {AuthBtns,NavIconContainer } from "./Navbar"

function Sidebar({showSidebar,setShowSidebar}) {
  let NavigateTo = useNavigate();
  let closeSidebar = () => {
    setShowSidebar(false)
  }
     
  return (
    <div className="sidebar" >
   

          <Offcanvas style={{
              width: "13em",
              height: "fit-content",
              backgroundColor:"lightGray"
              
      }} show={showSidebar} onHide={closeSidebar} placement="end">
        <Offcanvas.Header  closeButton>
           </Offcanvas.Header>
              <Offcanvas.Body>
                  <NavIconContainer sidebarData={{
                      direction: "column",
                      gap:"2",
                      navLabel: {
                          home: "Home",
                          newFriend: "Users",
                          notify: "Notifications",
                        msg: "Messages",
                        profile: "Profile",
                          closeSidebar:closeSidebar
                       },
                       
                  }} setShowSidebar={setShowSidebar} NavigateTo={NavigateTo} />
                  <AuthBtns NavigateTo={NavigateTo} login={false} sidebar={true} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Sidebar;