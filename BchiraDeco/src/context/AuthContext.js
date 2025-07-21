import React, { createContext, useState } from "react";

export const authStore = createContext();
function AuthContext({ children }) {
  
  const [auth, setAuth] = useState(null);
  return <authStore.Provider value={{ auth, setAuth }}>{children}</authStore.Provider>;
}

export default AuthContext;
