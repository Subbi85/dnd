import React, { useState } from "react";
import axios from "axios";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Fehlernachricht anzeigen


  // Funktion, um den Login zu handhaben
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(username, password)

        // Sicherstellen, dass die Felder nicht leer sind
        if (!username || !password) {
          setErrorMessage("Benutzername und Passwort sind erforderlich.");
          return;
        }

        try {
          // POST-Anfrage an den Login-API-Endpunkt
          const response = await axios.post("http://localhost:4000/api/login", {
            username,
            password,
          });
    
          // Wenn Login erfolgreich ist, Token speichern
          localStorage.setItem("token", response.data.token);
    
        } catch (err) {
          console.error(err);
          setErrorMessage("Ungültiger Benutzername oder Passwort.");
        }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Benutzername</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;