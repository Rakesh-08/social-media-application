import React, { useState } from "react";
import { Stack, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginCall, signupCall } from "../apiCalls/authApis";

let initForm = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ login }) => {
  let [authToggle, setAuthToggle] = useState(login ? false : true);
  let [showPasswordError, setShowPasswordError] = useState(false);
  let [signupSuccessMsg, setSignupSuccessMsg] = useState(false);
  let [showSpinner,setShowSpinner] = useState(false);
  let [guestUser, setGuestUser] = useState(false);
  
  let [authData, setAuthData] = useState(initForm);
  let NavigateTo = useNavigate();

  let onChangeInAuthInput = (e) => { 
    
    if (e.target.value==" ") {
      return;
    }
   
 setAuthData({...authData, [e.target.name]: e.target.value });
   };

  let handleSubmit = (e) => {
    e.preventDefault();
    setShowSpinner(true)

    if (authToggle) {
            // sign up function
      let { confirmPassword, ...authDetails } = authData;

      if (authData.password !== confirmPassword) {
        let ErrorMsg = setShowPasswordError(true);
        setTimeout(() => {
          setShowPasswordError(false);
        }, 5000);
        return;
      }

      signupCall(authDetails)
        .then((data) => {
          setAuthData(initForm);
          setShowSpinner(false)
          let successMsg = setSignupSuccessMsg(true);

          setTimeout(() => {
            setSignupSuccessMsg(false)
          }, 10000);

        }).catch((err) => {
          console.log(err);
          localStorage.setItem("errorCode",err.response.status);
          localStorage.setItem("errMsg", err.response.data.message);
          NavigateTo("/Error")
      })
      
    } else {

      // login as guest user 
      if (guestUser) {
       
        NavigateTo("/home");
        localStorage.clear();
        return;
      }
           // login function
      
      let authDetails = {
        username: authData.username,
        password:authData.password
      }
      
       loginCall(authDetails)
         .then((res) => {
           localStorage.setItem("authInfo", JSON.stringify(res.data));
           localStorage.setItem("pgmToken",res.data.accessToken)
           setAuthData(initForm);
           NavigateTo("/home")
         })
         .catch((err) => {
           console.log(err);
            localStorage.setItem("errorCode", err.response.status);
            localStorage.setItem("errMsg", err.response.data.message);
            NavigateTo("/Error");
         });
       }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <Stack
        direction="row"
        sx={{ justifyContent: "space-around", width: "100%", flexWrap: "wrap" }}
      >
        <Box m={2} display="flex" alignItems="center" sx={{ flexWrap: "wrap" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPHRvtFUvNT9Rrpz2HE4gu05hPPg8m7DweCg&usqp=CAU"
            alt="logo"
            width="35%"
            style={{ borderRadius: "49%", margin: " 0.2rem", maxWidth: "15em" }}
          />
          <div className="m-3">
            <p className="display-4 fw-bold appName">P G M</p>
            <p className="fs-5">
              <b>Explore the World and Entertain the World</b>
            </p>
          </div>
        </Box>

        <Box m={2}>
          <Card
            sx={{
              borderRadius: "1em",

              margin: "1em",
              padding: "1em",
              background:
                "linear-gradient(30deg, rgb(125, 6, 6), rgb(236, 176, 123),lightBlue)",
            }}
          >
            <p className="text-center fw-bold fs-5">
              {authToggle ? "Sign up" : "Login"}
            </p>
            <form onSubmit={handleSubmit}>
              <div className={authToggle ? "signUpForm" : "loginForm"}>
                {authToggle && (
                  <input
                    required
                    className="form-control "
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={authData.firstName}
                    onChange={(e) => onChangeInAuthInput(e)}
                  />
                )}

                {authToggle && (
                  <input
                    required
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={authData.lastName}
                    onChange={(e) => onChangeInAuthInput(e)}
                  />
                )}

                <input
                  required={!guestUser}
                  className="form-control username "
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={authData.username}
                  onChange={(e) => onChangeInAuthInput(e)}
                />
                <input
                  required={!guestUser}
                  className="form-control"
                  type={authToggle ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={authData.password}
                  onChange={(e) => onChangeInAuthInput(e)}
                />

                {!authToggle &&
                  <div className="p-2">
                    <span className="mx-2" >login as guest user</span>
                    <input type="checkbox"
                      onChange={(e) => setGuestUser(e.target.checked)}
                    />
                </div>}

                {authToggle && (
                  <input
                    required
                    className="form-control  "
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={authData.confirmPassword}
                    onChange={(e) => onChangeInAuthInput(e)}
                  />
                )}
              </div>
              {showPasswordError && (
                <div className="text-end text-danger m-2">
                  *confirm password is different
                </div>
              )}

              <div className="d-flex flex-wrap justify-content-around align-items-center">
                {" "}
                <div
                  style={{
                    justifySelf: "center",
                    alignSelf: "center",
                  }}
                >
                  
                  <button className="btn my-2 btn-warning">
                    
                    {!showSpinner && <span>{authToggle ? "submit" : "login"} </span>} 
                    { showSpinner&& <><span
                        className="spinner-border text-secondary mx-1 spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...</>}  
                    </button>
                  
                </div>
                <p
                  style={{
                    color: "rgb(190,250,231)",
                    textDecoration: "underline",
                  }}
                  className=" m-2 my-3 "
                >
                  {authToggle
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <span
                    onClick={() => {
                      setAuthData(initForm);
                      setShowPasswordError(false);
                      setAuthToggle(!authToggle);
                      if (authToggle) {
                        NavigateTo("/Auth/login")
                      } else {
                        NavigateTo("/Auth/signup")
                      }
                    }}
                    className="pointer"
                  >
                    {authToggle ? "Login" : "sign up"}
                  </span>
                </p>
              </div>
              {signupSuccessMsg && (
                <div
                  style={{
                    textAlign: "center",
                    color: "rgb(312,425,134)",
                    fontSize: "1.04em",
                  }}
                >
                  sign up Successfully
                </div>
              )}
            </form>
          </Card>
        </Box>
      </Stack>
    </div>
  );
};

export default Auth;
