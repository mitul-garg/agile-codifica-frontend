import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Authentication/AuthContext";
import { Editorial } from "../shared/UIElements/Editorial";

import RingLoader from "react-spinners/RingLoader";

const override = `
  display: block;
  margin: 10rem auto;
`;

export const MyEditorials = () => {
  const auth = useContext(AuthContext);

  const [editorials, setEditorials] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.user) {
      const fetchUserEditorials = async () => {
        setIsLoading(true);
        const user = auth.user;
        try {
          const response = await fetch(
            `http://localhost:8000/user/editorials/${user.email}`
          );
          const responseData = await response.json();
          if (responseData.msg) {
            throw new Error(responseData.msg);
          }
          setEditorials(responseData);
          setIsLoading(false);
        } catch (error) {
          alert(error + " try again");
          setIsLoading(false);
        }
      };
      fetchUserEditorials();
    }
  }, [auth.user]);

  if (isLoading) {
    return <RingLoader color={"#88ebf2"} css={override} />;
  }

  return (
    <div className="home-page">
      {!auth.isLoggedIn && <h1>NOT LOGGED IN</h1>}
      {auth.isLoggedIn && (
        <div className="editorials">
          <h1 className="page-title">YOUR EDITORIALS</h1>
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
                    myEditorial={true}
                    id={_id}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
