import React, { useEffect, useState } from "react";

import { Editorial } from "../shared/UIElements/Editorial";

import RingLoader from "react-spinners/RingLoader";

import "./Editorials.css";

const override = `
  display: block;
  margin: 10rem auto;
`;

export const Editorials = () => {
  const [editorials, setEditorials] = useState(null);
  const [taggedEditorials, setTaggedEditorials] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEditorials = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/editorials`);
        const responseData = await response.json();
        if (responseData.msg) {
          throw new Error(responseData.msg);
        }
        setEditorials(responseData);
        setTaggedEditorials(responseData);
      } catch (error) {
        alert(error + " try again");
      }
      setIsLoading(false);
    };
    fetchEditorials();
  }, []);

  const allTags = new Set();
  if (editorials) {
    for (let i = 0; i < editorials.length; i++) {
      for (let j = 0; j < editorials[i].problemTags.length; j++) {
        allTags.add(editorials[i].problemTags[j]);
      }
    }
  }

  const tagsArray = Array.from(allTags);
  // console.log(tagsArray);

  const tagsFilterHandler = (event) => {
    const selectedTag = event.target.value;
    if (selectedTag === "All") {
      setTaggedEditorials(editorials);
    } else {
      let newEditorials = [];
      for (let i = 0; i < editorials.length; i++) {
        if (editorials[i].problemTags.includes(selectedTag)) {
          newEditorials.push(editorials[i]);
        }
      }
      setTaggedEditorials(newEditorials);
    }
  };

  const searchProblemHandler = (event) => {
    const problem = event.target.value;
    let newEditorials = [];
    for (let i = 0; i < editorials.length; i++) {
      if (editorials[i].title.toLowerCase().indexOf(problem) !== -1)
        newEditorials.push(editorials[i]);
    }
    setTaggedEditorials(newEditorials);
  };

  if (isLoading) {
    return <RingLoader color={"#88ebf2"} css={override} />;
  }

  return (
    <div className="home-page">
      <div>
        <h1 className="page-title">EDITORIALS</h1>
        {taggedEditorials && (
          <>
            <div className="editorial-filters">
              <label style={{ color: "white" }} className="filter-dropdown">
                Problem Tags :
                <select onChange={tagsFilterHandler}>
                  <option key="default" value="All">
                    All
                  </option>
                  {tagsArray.map((tag, index) => {
                    return (
                      <option key={index} value={tag}>
                        {tag}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label style={{ color: "white" }} className="search-bar">
                Search Problem Name :
                <input type="text" onChange={searchProblemHandler} />
              </label>
            </div>
            <div className="editorial-container">
              {taggedEditorials.map((editorial) => {
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
          </>
        )}
      </div>
    </div>
  );
};
