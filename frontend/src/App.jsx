import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

// components and pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import ErrorPage from "./pages/ErrorPage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import UsersPage from "./pages/UsersPage";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <LayoutForNonNavbar>
        <Navbar />
      </LayoutForNonNavbar>

      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("pgmToken") ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/Auth/login" />
            )
          }
        ></Route>
        <Route
          path="/home"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <>
              <Profile />
              <Footer />
            </>
          }
        ></Route>
        <Route path="/Auth/login" element={<Auth login={true} />}></Route>
        <Route path="/Auth/signup" element={<Auth />}></Route>
        <Route path="/Error" element={<ErrorPage />}></Route>
        <Route
          path="/users"
          element={
            <>
              <UsersPage />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/notifications"
          element={
            <>
              <NotificationsPage /> <Footer />
            </>
          }
        ></Route>
        <Route
          path="/messages"
          element={
            <>
              <MessagesPage />
              <Footer />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function LayoutForNonNavbar({ children }) {
  let [showNavbar, setShowNavbar] = useState(false);
  let location = useLocation();
  let excludedRoutes = ["/Error", "/Auth/login", "/Auth/signup"];

  useEffect(() => {
    if (excludedRoutes.includes(location.pathname)) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 99,
        background: "linear-gradient(80deg ,rgb(153, 144, 240),white ,purple )",
      }}
    >
      {showNavbar && children}
    </div>
  );
}
