import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {AuthBtns,NavIconContainer } from "./Navbar"

function Sidebar({showSidebar,setShowSidebar}) {
    let NavigateTo = useNavigate();
     
  return (
    <div className="sidebar" >
   

          <Offcanvas style={{
              width: "13em",
              height: "fit-content",
              backgroundColor:"lightGray"
              
      }} show={showSidebar} onHide={()=>setShowSidebar(false)} backdrop="static" placement="end">
        <Offcanvas.Header  closeButton>
           </Offcanvas.Header>
              <Offcanvas.Body>
                  <NavIconContainer sidebarData={{
                      direction: "column",
                      gap:"2",
                      navLabel: {
                          home: "Home",
                          newFriend: "Friends",
                          notify: "Notifications",
                          msg:"Messages"
                       }
                  }} NavigateTo={NavigateTo} />
                  <AuthBtns NavigateTo={NavigateTo} login={false} sidebar={true} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Sidebar;