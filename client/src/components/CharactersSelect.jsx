import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';

const CharactersSelect = () => {
  const { loggedInUser, characters, setChosenCharacter } = useAppContext();
  const [ chosenCharacter, setLocalChosenCharacter ] = useState("");

  useEffect(() => {
    const storedCharacter = localStorage.getItem("chosenCharacter");
    if (storedCharacter) {
      try {
        const parsedCharacter = JSON.parse(storedCharacter);
        setLocalChosenCharacter(parsedCharacter.name);
      } catch (err) {
        console.error("Fehler beim Parsen des gespeicherten Charakters:", err);
      }
    }
  }, []);

  const handleCharacterChange = (e) => {
    const selectedCharacter = characters.find(
      (character) => character.name === e.target.value
    );
    setChosenCharacter(selectedCharacter); 
    setLocalChosenCharacter(e.target.value);
    localStorage.removeItem("chosenCharacter");
    localStorage.setItem("chosenCharacter", JSON.stringify(selectedCharacter));

    window.location.reload();
  };

  if (!loggedInUser) {
    return (
      <div>
        <h2>Du bist nicht eingeloggt</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center my-auto">
      <h2 className="mr-4">{loggedInUser.username}, deine Charaktere:</h2>
      <select
        className="p-2 border rounded"
        onChange={handleCharacterChange}
        value={chosenCharacter || ""}
      >
        <option value="" disabled>
          Wähle einen Charakter
        </option>
        {characters
          .filter((character) => character.username === loggedInUser?.username)
          .map((character, index) => (
            <option key={index} value={character.name}>
              {character.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CharactersSelect;
