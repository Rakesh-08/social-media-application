import React,{useState} from 'react';
import { Stack, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom"

const Auth = () => {
  let [authToggle, setAuthToggle] = useState(false);
  let NavigateTo = useNavigate();
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center ">
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
              background: "linear-gradient(30deg, rgb(125, 6, 6), rgb(236, 176, 123),lightBlue)",
            }}
          >
            <p className="text-center fw-bold fs-5">
              {authToggle ? "Sign up" : "Login"}
            </p>
            <form className={authToggle ? "signUpForm" : "loginForm"}>
              {authToggle && (
                <input
                  required
                  className="form-control "
                  type="text"
                  placeholder="First Name"
                />
              )}

              {authToggle && (
                <input
                  required
                  className="form-control"
                  type="text"
                  placeholder="Last Name"
                />
              )}

              <input
                required
                className="form-control username"
                type="text"
                placeholder="Username"
              />
              <input
                required
                className="form-control"
                type={authToggle ? "text" : "password"}
                placeholder="Password"
              />

              {authToggle && (
                <input
                  required
                  className="form-control"
                  type="password"
                  placeholder="Confirm Password"
                />
              )}
              <div
                style={{
                  justifySelf: "center",
                  alignSelf: "center",
                }}
              >
                {authToggle ? <button className="btn follow btn-warning">submit</button> : <button onClick={(e) => {
                  e.preventDefault(); NavigateTo("/")
                }} className="btn follow btn-warning">login</button>}
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
                  onClick={() => setAuthToggle(!authToggle)}
                  className="pointer"
                >
                  {authToggle ? "Login" : "sign up"}
                </span>
              </p>
            </form>
          </Card>
        </Box>
      </Stack>
    </div>
  );
}

export default Auth