// UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        setLoggedInUser(JSON.parse(userData));
      } catch (err) {
        console.error("Fehler beim Parsen von userData:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setLoggedInUser(null);
  };

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
