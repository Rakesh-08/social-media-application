import React,{useEffect} from 'react'
import { useLocation } from "react-router-dom";

const MessagesPage = () => {
  const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  return (
    <div className="vh-100 p-2 ">
      <div style={{position:"absolute",top:"30%"}} className="text-uppercase display-6 text-center ">
        Messeging Service is live now.... 
         <span className="mx-2"><a href="https://chit-chat-with-mandal.netlify.app" target="_blank">Click here</a></span>
      </div>
    </div>
  );
}

export default MessagesPage