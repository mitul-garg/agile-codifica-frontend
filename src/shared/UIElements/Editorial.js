import React from "react";

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
}) => {
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
    </div>
  );
};
