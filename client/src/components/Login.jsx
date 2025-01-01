import React, { useState, useEffect } from "react";
import axios from "axios";

//Icons
import { TbLogin2,TbLogout2 } from "react-icons/tb";

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
        <div className="flex flex-row">
          <p>Willkommen, {loggedInUser.username}!</p>
          {/* Du kannst hier weitere Eigenschaften von loggedInUser verwenden */}
          <button onClick={handleLogout}><TbLogout2 size={20}/></button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="flex flew-row">
            <div className="relative z-0 w-1/2 mb-5 group">
              <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Benutzername</label>
            </div>

            <div className="relative z-0 w-1/2 mb-5 group px-2">
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passwort</label>
            </div>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit"> <TbLogin2 size={20} /></button>
          </div>

        </form>
      )}
    </div>
  );
};

export default Login;
