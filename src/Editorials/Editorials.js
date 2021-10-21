import React, { useEffect, useState } from "react";

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
        <h1>EDITORIALS</h1>
        {editorials &&
          editorials.map((editorial, index) => (
            <h2 key={index}>{editorial.title}</h2>
          ))}
      </div>
    </div>
  );
};
