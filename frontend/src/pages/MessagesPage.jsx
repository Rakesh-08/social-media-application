import React,{useEffect} from 'react'
import { useLocation } from "react-router-dom";

const MessagesPage = () => {
  const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  return (
    <div className="min-vh-100 p-2 d-flex align-items-center justify-content-center">
      <div className="text-uppercase display-3">
        Messeging Service is under progress and will be available soon.... 
        
         </div>
    </div>
  )
}

export default MessagesPage