import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import axios from 'axios';

//Icons
import { AiOutlineDelete } from "react-icons/ai";

const ShopSummary = ({ shoppingCardItems, setShoppingCardItems }) => {
  const { chosenCharacter } = useAppContext();
  const totalPrice = shoppingCardItems.reduce((sum, item) => sum + item.price, 0);
  const [gold, setGold] = useState(100000);
  const rest = gold - totalPrice;

  console.log('Dein Character:', chosenCharacter);

  //Item aus dem Warenkorb entfernen
  const deleteFromShoppingCard = (itemToRemove) => {
    setShoppingCardItems((prevItems) =>
      prevItems.filter((item) => item !== itemToRemove)
    );
  };

  useEffect(() => { }, []);

// Kauf von Items
const handlePayment = async (data) => {
  if (!chosenCharacter) {
    alert('Kein Charakter ausgewählt!');
    return;
  }

  const updatedData = {
    items:  [...data],
    name: chosenCharacter.name,
    id: chosenCharacter._id,
  };

  // API-Anfrage ausführen
  try {
    const response = await axios.put(
      `http://localhost:4000/api/characters/${updatedData.id}/inventory`,
      updatedData
    );

    setShoppingCardItems([]);

  } catch (err) {
    console.error('Fehler beim Kauf:', err.message);
  }
};

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">Deine Items</p>
        <div className="space-y-4">
          {shoppingCardItems.map((item, index) => (
            <dl key={index} className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">{item.name}</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">{item.price.toLocaleString('de-DE')} G</dd>
              <button
                onClick={() => deleteFromShoppingCard(item)}
                className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
              >
                <AiOutlineDelete size={20} />
              </button>
            </dl>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <div className="space-y-4">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Gesamtpreis</dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">{totalPrice.toLocaleString('de-DE')} G</dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">aktueller Goldstand</dt>
            <dd className="text-base font-medium text-green-600">{gold.toLocaleString('de-DE')} G</dd>
          </dl>
          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">{chosenCharacter.name} restliches Gold</dt>
            <dd
              className={`text-base font-bold ${
                rest < 0 ? 'text-red-600' : 'text-gray-900 dark:text-white'
              }`}
            >
              {rest.toLocaleString('de-DE')} G
            </dd>
          </dl>
        </div>
        <button
          onClick={()=>handlePayment(shoppingCardItems)}
          disabled={rest < 0}
          className={`flex w-full items-center justify-center rounded-lg ${
            rest < 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-700 hover:bg-primary-800'
          } px-5 py-2.5 text-sm font-medium text-white`}
        >
          Bezahlen
        </button>
      </div>
    </div>
  );
};

export default ShopSummary;
