import React, { useEffect, useState } from "react";

import { Editorial } from "../shared/UIElements/Editorial";

import "./Editorials.css";

export const Editorials = () => {
  const [editorials, setEditorials] = useState(null);

  useEffect(() => {
    const fetchEditorials = async () => {
      try {
        const response = await fetch(`http://localhost:8000/editorials`);
        const responseData = await response.json();
        if (responseData.msg) {
          throw new Error(responseData.msg);
        }
        setEditorials(responseData);
      } catch (error) {
        alert(error + " try again");
      }
    };
    fetchEditorials();
  }, []);

  return (
    <div className="home-page">
      <div>
        <h1 className="page-title">EDITORIALS</h1>
        {editorials && (
          <div className="editorial-container">
            {editorials.map((editorial) => {
              const {
                _id,
                title,
                contestId,
                problemTags,
                difficultyLevel,
                editorialCode,
                editorialDesc,
                programmingLanguage,
              } = editorial;
              return (
                <Editorial
                  key={_id}
                  title={title}
                  contestId={contestId}
                  problemTags={problemTags}
                  difficultyLevel={difficultyLevel}
                  editorialCode={editorialCode}
                  editorialDesc={editorialDesc}
                  programmingLanguage={programmingLanguage}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
