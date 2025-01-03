import React, { useState, useEffect } from "react";
import axios from "axios";

import { AiOutlineDelete } from "react-icons/ai";

const Modal = ({ isOpen, onClose, character }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center b-</div>black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal content */}
        <div className="relative">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <div className="flex items-center space-x-2">
              <h3 className="text-gray-900 dark:text-white size-4xl font-bold">
                {character.name || "Unbekannt"}
              </h3> 
              <div className="flex flex-row items-center space-x-2">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {character.class || "Keine Beschreibung verfügbar."}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {character.race || "Keine Beschreibung verfügbar."}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dr</div>k:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <div className="px-2">
              <div className="flex -mx-2">
              {Object.entries(character.attributes).map(([key, value], index) => (
                <div className="w-1/3 px-2" key={index}>
                  <div className="h-14 flex flex-col justify-center items-center">
                    <h3>{key}</h3> 
                    <p>{value}</p>
                  </div>
                </div>
              ))}
              </div>
            </div>

            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {character.desc || "Keine Beschreibung verfügbar."}
            </p>
          </div>

          {/* Modal footer */}
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={onClose}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState({});
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:4000/api/characters");


      console.log(response.data);
      setCharacters(
        Array.isArray(response.data.characters) ? response.data.characters : []
      ); 
    } catch (err) {
      console.error("Fehler beim Abrufen der Charaktere:", err);
      setError("Fehler beim Abrufen der Charaktere");
    } finally {
      setLoading(false);
    }
  };
  
  const deleteCharacter = async (character) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/characters/${character._id}`);
      console.log(response.data);
      fetchCharacters();
    } catch (err) {
      console.error("Fehler beim Löschen des Charakters:", err);
    }
  };

  const openModal = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter({});
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Unsere Charaktere</h1>
      {loading && <p>Laden...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        {characters.length > 0 ? (
          characters.map((character, index) => (
            <>
            <button
              key={index}
              onClick={() => openModal(character)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {character.name}
            </button>
            <AiOutlineDelete size={20} onClick={()=>deleteCharacter(character)}/>
            </>              
          ))
        ) : (
          !loading && <p>Keine Charaktere gefunden.</p>
        )}
      </div>

      {/* Shared Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        character={selectedCharacter}
      />
    </div>
  );
};

export default App;
