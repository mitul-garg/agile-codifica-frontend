import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Authentication/AuthContext";
import { Editorial } from "../shared/UIElements/Editorial";

export const Home = () => {
  const auth = useContext(AuthContext);

  const [editorials, setEditorials] = useState(null);

  useEffect(() => {
    if (auth.user) {
      const fetchUserEditorials = async () => {
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
        } catch (error) {
          alert(error + " try again");
        }
      };
      fetchUserEditorials();
    }
  }, [auth.user]);

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
