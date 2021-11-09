import React, { useState } from "react";
import { useHistory } from "react-router";

// Ace Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";

import "./Editorial.css";

export const Editorial = ({
  title,
  contestId,
  problemTags,
  difficultyLevel,
  editorialCode,
  editorialDesc,
  programmingLanguage,
  myEditorial,
  id,
}) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const editHandler = () => {
    // console.log("edit");
    history.push(`/update/${id}`);
    // console.log(id);
  };

  const deleteHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/write/editorial`,
        {
          method: "DELETE",
          body: JSON.stringify({
            _id: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      console.log(response);
      history.push("/");
    } catch (err) {
      alert(err + " try again");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="editorial">
      <h4 className="editorial-title">{title}</h4>
      <h5 className="editorial-contestId">Contest Id : {contestId}</h5>
      <ul className="editorial-problemTags">
        {problemTags.map((pt, index) => {
          return (
            <li key={index} className="editorial-problemTag">
              {pt}
            </li>
          );
        })}
      </ul>
      <h5>Rating : {difficultyLevel}</h5>
      <h5>Language : {programmingLanguage}</h5>
      <div className="code-editor">
        <AceEditor
          mode="c_cpp"
          theme="dracula"
          defaultValue={editorialCode}
          readOnly={true}
          name="UNIQUE_ID_OF_DIV"
        />
      </div>
      <div className="editorialDesc">{editorialDesc}</div>
      {myEditorial && (
        <div className="edit-delete-btns">
          <button onClick={editHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      )}
    </div>
  );
};
