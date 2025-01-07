import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [chosenCharacter, setChosenCharacter] = useState(null);

    useEffect(() => {
      fetchCharacters();
      getChosenCharacter();
  }, []); 

  //Beschaffen des gewählten Charakters
  const getChosenCharacter = () => {
      const storedCharacter = localStorage.getItem("chosenCharacter");
      if (storedCharacter) {
          try {
              setChosenCharacter(JSON.parse(storedCharacter));
          } catch (err) {
              console.error("Fehler beim Parsen des gespeicherten Charakters:", err);
          }
      }
  };

    const fetchCharacters = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/characters");
          setCharacters(
            Array.isArray(response.data.characters) ? response.data.characters : []
          ); 
        } catch (err) {
          console.error("Fehler beim Abrufen der Charaktere:", err);
          setError("Fehler beim Abrufen der Charaktere");
        }
      };

    //Beschaffen des eingeloggtens Users
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


  return (
    <AppContext.Provider value={{ characters, setCharacters, loggedInUser, setLoggedInUser, chosenCharacter, setChosenCharacter }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);