import React, { useState, useEffect } from "react";
import axios from "axios";

// Icons
import { TbLogin2, TbLogout2 } from "react-icons/tb";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.user && parsedData.user.username && parsedData.user.id) {
          setLoggedInUser(parsedData.user);
        } else {
          localStorage.removeItem("userData");
        }
      } catch (err) {
        localStorage.removeItem("userData"); 
      }
    }
  }, []);
  
  // Login-Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
  
    if (!username || !password) {
      setErrorMessage("Benutzername und Passwort sind erforderlich.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });
  
        const userData = response.data; 
        if (userData && userData.user) {
        localStorage.setItem("userData", JSON.stringify(userData)); 
        setLoggedInUser(userData.user); 
      } else {
        setErrorMessage("Ungültige Antwort vom Server.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMessage("Ungültiger Benutzername oder Passwort.");
      } else {
        setErrorMessage("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Logout-Handler
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setLoggedInUser(null);
  };

  return (
    <div>
      {loggedInUser ? (
        <div className="flex flex-row">
          Willkommen, 
          <span className={`
            ${loggedInUser.role === 'admin' ? 'text-red-500' : ''} 
            ${loggedInUser.role === 'player' ? 'text-blue-500' : ''} 
          `}>
            {loggedInUser.username}
          </span>!
          <button onClick={handleLogout}>
            <TbLogout2 size={20} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="flex flew-row">
            <div className="relative z-0 w-1/2 mb-5 group">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                autoComplete="username"
                name="username"
                id="username"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
              <label
                htmlFor="username"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Benutzername
              </label>
            </div>

            <div className="relative z-0 w-1/2 mb-5 group px-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                autoComplete="current-password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Passwort
              </label>
            </div>

            {errorMessage && (
              <div className="flex items-center text-red-500 p-2 bg-red-100 border border-red-400 rounded">
                <span>{errorMessage}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center ${loading ? "bg-gray-400" : "bg-blue-500"}`}
            >
              {loading ? "Einloggen..." : <TbLogin2 size={20} />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
