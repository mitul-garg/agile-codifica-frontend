import React, { useState, useContext } from "react";
import { useHistory } from "react-router";

import { AuthContext } from "../Authentication/AuthContext";

// Ace Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";

// Text Editor

import "./Write.css";

export const Write = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const codeforces = user.codeforcesHandle;

  const history = useHistory();

  const [problemLink, setProblemLink] = useState("");
  const [name, setName] = useState("");
  const [editorialDesc, setEditorialDesc] = useState("");
  const [editorialCode, setEditorialCode] = useState("");

  let ptags = null,
    dl = 0,
    cid = 0,
    accepted = false;

  const onCodeEditorStateChange = (newValue) => {
    setEditorialCode(newValue);
  };

  const writeEditorialHandler = async (event) => {
    event.preventDefault();
    await validations();
    if (accepted) {
      try {
        // console.log(cid, ptags, dl, accepted);
        const response = await fetch(
          "http://localhost:8000/user/write/editorial",
          {
            method: "POST",
            body: JSON.stringify({
              email: auth.user.email,
              problemLink: problemLink,
              name: name,
              contestId: cid,
              problemTags: ptags,
              difficultyLevel: dl,
              editorialDesc: editorialDesc,
              editorialCode: editorialCode,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.msg) {
          throw new Error(responseData.msg);
        }
        history.push("/");
      } catch (err) {
        alert(err + " try again");
      }
    }
  };

  const validations = async () => {
    try {
      const codeforcesDetails = await fetch(
        `https://codeforces.com/api/user.status?handle=${codeforces}`
      );
      const responseData = await codeforcesDetails.json();

      // contestId from problemLink
      let contestIdPL = "";
      for (let i = 0; i < problemLink.length; i++) {
        if (problemLink.charAt(i) >= "0" && problemLink.charAt(i) <= "9") {
          contestIdPL += problemLink.charAt(i);
        }
        if (contestIdPL !== "" && problemLink.charAt(i) === "/") {
          break;
        }
      }
      cid = contestIdPL;
      // console.log(cid);

      // problemCode from problemLink
      let problemCode = "";
      for (let i = problemLink.length - 1; i >= 0; i--) {
        if (problemLink !== "" && problemLink.charAt(i) === "/") {
          break;
        }
        problemCode += problemLink.charAt(i);
      }

      // check if the user has submitted the question or not
      const results = responseData.result;
      contestIdPL = parseInt(contestIdPL);
      for (let i = 0; i < results.length; i++) {
        if (
          results[i].contestId === contestIdPL &&
          results[i].problem.index === problemCode &&
          results[i].verdict === "OK"
        ) {
          accepted = true;
          // console.log(accepted);
          // setAccepted(true);
          // problemTags & difficulty from responseData
          // setProblemTags(results[i].problem.tags);
          ptags = results[i].problem.tags;
          // console.log(ptags);
          // setDifficultyLevel(results[i].problem.rating);
          dl = results[i].problem.rating;
          // console.log(dl);
        }
        if (accepted) {
          break;
        }
      }

      if (!accepted) {
        throw new Error("You do not have an accepted code for this problem!");
      }
    } catch (error) {
      alert(error);
      return;
    }
  };

  return (
    <div className="center">
      <article className="form">
        <h3 style={{ color: "black" }}>Write your Editorial here!</h3>
        <form name="writeEditorial" onSubmit={writeEditorialHandler}>
          <div className="form-group">
            <input
              type="text"
              name="problemLink"
              placeholder="enter problem link"
              className="form-control"
              value={problemLink}
              onChange={(e) => {
                setProblemLink(e.target.value);
              }}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Enter Editorial Title"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              className="form-control"
              name="editorialDesc"
              placeholder="Enter Editorial"
              value={editorialDesc}
              onChange={(e) => setEditorialDesc(e.target.value)}
              rows={20}
              required
            />
            <div className="code-editor">
              <AceEditor
                mode="c_cpp"
                theme="dracula"
                onChange={onCodeEditorStateChange}
                name="UNIQUE_ID_OF_DIV"
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            ADD EDITORIAL
          </button>
        </form>
      </article>
    </div>
  );
};
