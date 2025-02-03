import React, { useState, useEffect } from 'react';

//Icons
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineSell } from "react-icons/md";

const InventarDisplay = () => {
    const [chosenCharacter, setChosenCharacter] = useState(null);
    
    useEffect(() => {
        getChosenCharacter();
    }, []);

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

    if (!chosenCharacter) {
        return <div>Wird geladen...</div>;
    }

    

    return (
    <>
      {/* Character Info */}
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {chosenCharacter.name}
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Klasse:</span> {chosenCharacter.class}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Rasse:</span> {chosenCharacter.race}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Level:</span> {chosenCharacter.level}
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{chosenCharacter.desc}</p>
        </div>
      </div>

      {/* Character Attributes */}
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Attribute
        </h2>
        <div className="grid grid-cols-6 gap-4">
          {Object.entries(chosenCharacter.attributes).map(([key, value], index) => (
            <div
              key={index}
              className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow text-center"
            >
              <span className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
                {key}
              </span>
              <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Section */}
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Inventar
        </h2>
        <div className="flex flex-wrap gap-6">
          {chosenCharacter.inventory.map((item, index) => (
            <div
              key={index}
              className="flex-1 min-w-[150px] max-w-[200px] p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow"
            >
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.name}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Preis:</span> {item.price}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Bestand:</span> {item.stock}
              </div>
              <div className='flex justify-between'>
                <button ><AiOutlineDelete size={20}/></button>
                <button><MdOutlineSell size={20}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    );
};

export default InventarDisplay;
