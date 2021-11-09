import React, { useState, useContext } from "react";
import { useHistory } from "react-router";

import { AuthContext } from "../Authentication/AuthContext";

// Ace Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";

import RingLoader from "react-spinners/RingLoader";

import "./Write.css";

const override = `
  display: block;
  margin: 10rem auto;
`;

export const Write = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const codeforces = user.codeforcesHandle;

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const [problemLink, setProblemLink] = useState("");
  const [editorialDesc, setEditorialDesc] = useState("");
  const [editorialCode, setEditorialCode] = useState("");

  let ptags = null,
    dl = 0,
    cid = 0,
    accepted = false,
    ptitle = "",
    programmingLanguage = "";

  const onCodeEditorStateChange = (newValue) => {
    setEditorialCode(newValue);
  };

  const writeEditorialHandler = async (event) => {
    event.preventDefault();
    await validations();
    if (accepted) {
      setIsLoading(true);
      try {
        // console.log(cid, ptags, dl, accepted);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/write/editorial`,
          {
            method: "POST",
            body: JSON.stringify({
              email: auth.user.email,
              problemLink: problemLink,
              name: ptitle,
              contestId: cid,
              problemTags: ptags,
              difficultyLevel: dl,
              editorialDesc: editorialDesc,
              editorialCode: editorialCode,
              programmingLanguage: programmingLanguage,
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
        setIsLoading(false);
        history.push("/");
      } catch (err) {
        alert(err + " try again");
        setIsLoading(false);
      }
    }
    // setIsLoading(false);
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
          ptitle = results[i].problem.name;
          programmingLanguage = results[i].programmingLanguage;
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

  if (isLoading) {
    return <RingLoader color={"#88ebf2"} css={override} />;
  }

  return (
    <div className="center">
      <article className="form">
        <h3 className="form-title" style={{ color: "black" }}>
          Write your Editorial here!
        </h3>
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
                className="ace-code-editor"
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
