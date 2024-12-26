import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null); 

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    console.log("Gefundene Daten in localStorage:", userData);
  
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        console.log("Parsed userData:", parsedData);
        setLoggedInUser(parsedData);
      } catch (err) {
        console.error("Fehler beim Parsen von userData:", err);
      }
    }
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    if (!username || !password) {
      setErrorMessage("Benutzername und Passwort sind erforderlich.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });
      const userData = response.data;
      console.log("API Antwort:", userData);
      localStorage.setItem("userData", JSON.stringify(userData));
      setLoggedInUser(userData);
    } catch (err) {
      console.error("Login Error:", err);
      setErrorMessage("Ungültiger Benutzername oder Passwort.");
    }
  };
  

  // Funktion für Logout
  const handleLogout = () => {
    localStorage.removeItem("userData"); 
    setLoggedInUser(null);
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <p>Willkommen, {loggedInUser.username}!</p>
          {/* Du kannst hier weitere Eigenschaften von loggedInUser verwenden */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>Benutzername:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Passwort:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
