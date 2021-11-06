import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../Authentication/AuthContext";
import { FaLaptopCode, FaJava, FaPython } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";

import "./Home.css";

export const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="home">
      <h1 className="home-title">Welcome to Codifica</h1>
      <p className="home-para">
        Read and Write Unofficial Codeforces Editorials
      </p>
      {!auth.isLoggedIn && (
        <Link to="/login">
          <button className="home-btn">Login Now!!</button>
        </Link>
      )}
      {auth.isLoggedIn && (
        <Link to="/write">
          <button className="home-btn">Write a Editorial!</button>
        </Link>
      )}
      <FaLaptopCode className="laptop-icon" />
      <div className="language-icons">
        <FaJava className="language-icon" />
        <SiCplusplus className="language-icon" />
        <FaPython className="language-icon" />
      </div>
    </div>
  );
};
