import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import { AuthContext } from "../AuthContext";

import "./login.css";

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

  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
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
      auth.login(responseData);
      history.push("/");
    } catch (err) {
      alert(err + " try again");
    }
  };

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
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

      auth.login(responseData.user);
      history.push("/");
    } catch (err) {
      alert(err + " try again");
    }
  };

  const switchLoginMode = () => {
    if (isLoginMode) setIsLoginMode(false);
    else setIsLoginMode(true);
  };

  return (
    <div className="login-signup">
      {isLoginMode && (
        <article className="form">
          <h3 style={{ color: "black" }}>Login</h3>
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
              <input
                type="password"
                name="password"
                placeholder="password"
                className="form-control"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              login
            </button>
          </form>
        </article>
      )}
      {!isLoginMode && (
        <article className="form">
          <h3 style={{ color: "black" }}>Sign Up</h3>
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
              <input
                type="password"
                name="password"
                placeholder="password"
                className="form-control"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
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
