import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { AuthContext } from "../AuthContext";

import RingLoader from "react-spinners/RingLoader";

import "./login.css";

const override = `
  display: block;
  margin: 10rem auto;
`;

export const Login = () => {
  const history = useHistory();

  // login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // login

  // signup
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupCodeforces, setSignupCodeforces] = useState("");
  // signup

  // showpassword
  const [showPassword, setShowPassword] = useState(false);

  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.msg) {
        throw new Error(response.msg);
      }
      setIsLoading(false);
      auth.login(responseData);
      history.push("/");
    } catch (err) {
      alert(err + " try again");
      setIsLoading(false);
    }
  };

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        body: JSON.stringify({
          email: signupEmail,
          password: signupPassword,
          codeforcesHandle: signupCodeforces,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.msg) {
        throw new Error(responseData.msg);
      }
      setIsLoading(false);
      auth.login(responseData.user);
      history.push("/");
    } catch (err) {
      alert(err + " try again");
      setIsLoading(false);
    }
  };

  const switchLoginMode = () => {
    if (isLoginMode) setIsLoginMode(false);
    else setIsLoginMode(true);
  };

  if (isLoading) {
    return <RingLoader color={"#88ebf2"} css={override} />;
  }

  return (
    <div className="login-signup">
      {isLoginMode && (
        <article className="form">
          <h3 className="form-title" style={{ color: "black" }}>
            Login
          </h3>
          <form name="login" onSubmit={loginSubmitHandler}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="email"
                className="form-control"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <div className="password-holder">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="form-control"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                {!showPassword && (
                  <BsFillEyeFill
                    className="eye-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
                {showPassword && (
                  <BsFillEyeSlashFill
                    className="eye-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </div>
            </div>
            <button type="submit" className="submit-btn">
              login
            </button>
          </form>
        </article>
      )}
      {!isLoginMode && (
        <article className="form">
          <h3 className="form-title" style={{ color: "black" }}>
            Sign Up
          </h3>
          <form name="login" onSubmit={signupSubmitHandler}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="email"
                className="form-control"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <input
                type="text"
                name="codeforces"
                placeholder="codeforces handle"
                className="form-control"
                value={signupCodeforces}
                onChange={(e) => setSignupCodeforces(e.target.value)}
                required
              />
              <div className="password-holder">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="form-control"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                {!showPassword && (
                  <BsFillEyeFill
                    className="eye-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
                {showPassword && (
                  <BsFillEyeSlashFill
                    className="eye-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </div>
            </div>
            <button type="submit" className="submit-btn">
              signup
            </button>
          </form>
        </article>
      )}
      <button onClick={switchLoginMode} className="switch-btn">
        Switch to {isLoginMode ? "Signup" : "Login"}
      </button>
    </div>
    // <div>
    //   <button onClick={auth.login}>Dummy Login</button>
    // </div>
  );
};
