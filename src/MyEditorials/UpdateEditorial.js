import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

// Ace Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";

import RingLoader from "react-spinners/RingLoader";

const override = `
  display: block;
  margin: 10rem auto;
`;

export const UpdateEditorial = () => {
  const [editorialDesc, setEditorialDesc] = useState("");
  const [editorialCode, setEditorialCode] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const id = useParams().id;

  const fetchEditorial = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/editorial/${id}`
    );
    const responseData = await response.json();
    if (responseData.msg) {
      throw new Error(responseData.msg);
    }
    onCodeEditorStateChange(responseData.editorialCode);
    // console.log(responseData.editorialCode);
    setEditorialDesc(responseData.editorialDesc);
  };

  useEffect(() => {
    try {
      fetchEditorial();
      setIsLoading(false);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  }, []);

  const onCodeEditorStateChange = (newValue) => {
    setEditorialCode(newValue);
  };

  const updateEditorialHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/write/editorial`,
        {
          method: "PATCH",
          body: JSON.stringify({
            _id: id,
            editorialCode: editorialCode,
            editorialDesc: editorialDesc,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      console.log(response);
      history.push("/myeditorials");
    } catch (err) {
      alert(err + " try again");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <RingLoader color={"#88ebf2"} css={override} />;
  }

  return (
    <div className="center">
      <article className="form">
        <h3 className="form-title" style={{ color: "black" }}>
          Update your Editorial here!
        </h3>
        <form name="writeEditorial" onSubmit={updateEditorialHandler}>
          <div className="form-group">
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
                value={editorialCode}
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            EDIT EDITORIAL
          </button>
        </form>
      </article>
    </div>
  );
};
