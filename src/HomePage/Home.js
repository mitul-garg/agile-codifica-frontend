import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Authentication/AuthContext";

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
        <div>
          <h1>YOUR EDITORIALS</h1>
          {editorials &&
            editorials.map((editorial, index) => (
              <h2 key={index}>
                {editorial.title} + {editorial.problemTags}
              </h2>
            ))}
        </div>
      )}
    </div>
  );
};
