import React, { useContext } from "react";

import { AuthContext } from "../AuthContext";

export const Login = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <button onClick={auth.login}>Dummy Login</button>
    </div>
  );
};
