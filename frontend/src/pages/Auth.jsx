import React, { useState } from "react";
import { Stack, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { forgotPasswordCall, loginCall, signupCall } from "../apiCalls/authApis";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Modal } from "react-bootstrap"

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
  let [showPassword, setShowPassword] = useState(false);
  let [forgotPassword, setForgotPassword] = useState(false);
  
  let [authData, setAuthData] = useState(initForm);
  let NavigateTo = useNavigate();

  let onChangeInAuthInput = (e) => { 
    
    if (e.target.value==" ") {
      return;
    }
    if (showPasswordError) {
      setShowPasswordError(false)
    }
   
 setAuthData({...authData, [e.target.name]: e.target.value });
   };

  let handleSubmit = (e) => {
    e.preventDefault();
    

    if (authToggle) {
            // sign up function
      let { confirmPassword, ...authDetails } = authData;

      if (authData.password !== confirmPassword) {
        setShowPasswordError(true);
        return;
      }
      setShowSpinner(true);

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
      setShowSpinner(true);

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
           localStorage.setItem("pgmToken", res.data.accessToken);
           setAuthData(initForm);
           NavigateTo("/home")
         })
         .catch((err) => {
           console.log(err);
           setShowSpinner(false)
           if (err.response) {
             localStorage.setItem("errorCode", err.response.status);
            localStorage.setItem("errMsg", err.response.data.message);
            NavigateTo("/Error");
           } else {
             alert(err.message)
           }
            
         });
       }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <Stack
        direction="row"
        sx={{ justifyContent: "space-around", width: "100%", flexWrap: "wrap" }}
      >
        <Box m={2} display="flex" alignItems="center" >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPHRvtFUvNT9Rrpz2HE4gu05hPPg8m7DweCg&usqp=CAU"
            alt="logo"
            width="35%"
            style={{ borderRadius: "49%", margin: " 0.2rem", maxWidth: "15em" }}
          />
          <div style={{fontFamily:"UI"}} className="m-3">
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

                <div className="position-relative ">
                  <input
                    required={!guestUser}
                    className="form-control "
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={authData.password}
                    onChange={(e) => onChangeInAuthInput(e)}
                  />

                  {!authToggle && (
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", top: "10%", right: "5%" }}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  )}
                </div>

                {!authToggle && (
                  <div className="p-2 my-2">
                    <span className="mx-2">login as guest user</span>
                    <input
                      type="checkbox"
                      onChange={(e) => setGuestUser(e.target.checked)}
                    />
                  </div>
                )}

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

              <div className="d-flex  flex-wrap justify-content-around align-items-center">
                {" "}
       
                  <button className="btn follow btn-warning m-2">
                    {!showSpinner && (
                      <span>{authToggle ? "submit" : "login"} </span>
                    )}
                    {showSpinner && (
                      <>
                        <span
                          className="spinner-border text-secondary mx-1 spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        ...wait
                      </>
                    )}
                  </button>
               
                <div
                  className="m-2 p-2 "
                >
                  <span className="text-white border-bottom ">
                    {authToggle
                      ? "Already have an account? "
                      : "Don't have an account? "}
                    <span
                      onClick={() => {
                        setAuthData(initForm);
                        setShowPasswordError(false);
                        setSignupSuccessMsg(false);
                        setAuthToggle(!authToggle);
                        if (authToggle) {
                          NavigateTo("/Auth/login");
                        } else {
                          NavigateTo("/Auth/signup");
                        }
                      }}
                      className=" authHover"
                    >
                      {authToggle ? "Login" : "sign up"}
                    </span>
                  </span >
                  {!authToggle && <p onClick={()=>setForgotPassword(true)} className="authHover w-75" >forgot password?</p>}
                </div>
              </div>
              {signupSuccessMsg && (
                <div
                  style={{
                    textAlign: "center",
                    color: "rgb(312,425,134)",
                    fontSize: "1.04em",
                  }}
                >
                  sign up Successfully! try to login now
                </div>
              )}
            </form>
          </Card>
        </Box>
        <ForgotPassword forgotPassword={forgotPassword} setForgotPassword={setForgotPassword} />
      </Stack>
    </div>
  );
};


let ForgotPassword = ({ forgotPassword, setForgotPassword }) => {
  let [credential, setCredential] = useState({ username: "", password: "", confirmPassword: "" })
  let [showMsg, setShowMsg] = useState(false);
  let [resMsg,setResMsg] = useState("")

  let resetPassword = (e) => {
    e.preventDefault();
    let { username, password, confirmPassword } = credential;

    if (password != confirmPassword) {
      setShowMsg(true)
      return
    }

    forgotPasswordCall({ username,newPassword: password }).then((res) => {
      console.log(res);
      setResMsg("success")

    }).catch((err) => {
      console.log(err)
      setResMsg("failed")
    });
  }

  let handleOnChange = (e) => {
    
    if (e.target.value == " ") {
      return;
    }
    if (showMsg) {
      setShowMsg(false);
      return;
    }

    setCredential({...credential,[e.target.name]:e.target.value})
  }

  return (
    <Modal
      show={forgotPassword}
      onHide={() => setForgotPassword(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="fw-bold bg-warning ">Reset Password:</Modal.Header>
      <Modal.Body className="p-3 ">
        <form onSubmit={resetPassword}>
          <label>Enter your username </label>
          <input
            className="form-control"
            type="text"
            name="username"
            value={credential.username}
            onChange={(e) => handleOnChange(e)}
          />

          <label>New Password</label>
          <input
            className="form-control"
            type="text"
            name="password"
            value={credential.password}
            onChange={(e) => handleOnChange(e)}
          />
          <label> Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            value={credential.confirmPassword}
            onChange={(e) => handleOnChange(e)}
          />
          {showMsg && (
            <div className="text-danger m-2">
              *confirm password is different
            </div>
          )}

          <div className="d-flex justify-content-end m-2">
            <button type="submit" className="btn btn-primary m-1">
              confirm
            </button>
            <button
              type="button"
              onClick={() => {
                setForgotPassword(false)
                setResMsg("");
                setCredential({username:"",password:"",confirmPassword:""})
              }}
              className="btn btn-danger m-1"
            >
              cancel
            </button>
          </div>

          <div className="text-center m-2">
            {resMsg == "success" && <span className="text-success">Your password is reset, try to login with new Password</span>}
              {resMsg=="failed"&&<span className="text-danger">Some error occurred while reseting password, try again later</span>}
            
            </div>
        </form>
      </Modal.Body>
    
    </Modal>
  );

}

export default Auth;
