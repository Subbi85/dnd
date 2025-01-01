import React, { useState } from 'react';
import axios from 'axios';

//Icons
import { GiFragmentedSword , GiLeatherArmor , GiTemplarEye } from "react-icons/gi";

const ItemCard = ({ item, setShoppingCardItems }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleShoppingCardItems = (item) => {
    setShoppingCardItems((prevItems) => {
      if (!prevItems.includes(item)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const deleteItem = async (id) => {
    console.log(`Deleting item with ID ${id}...`);
    setIsDeleting(true);

    try {
      await axios.delete(`http://localhost:4000/api/items/${id}`);
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems);
      setFilteredItems(updatedItems);
      console.log(`Item with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Weapon':
        return <GiFragmentedSword className="h-6 w-6 text-gray-700 dark:text-white" size={40} />;
      case 'Armor':
        return <GiLeatherArmor className="h-6 w-6 text-gray-700 dark:text-white" size={40} />;
      case 'Wondrous Item':
        return <GiTemplarEye className="h-6 w-6 text-gray-700 dark:text-white" size={40} />;
      default:
        return <GiTemplarEye className="h-6 w-6 text-gray-700 dark:text-white" size={40} />;
    }
  };

  return (
    <div
      onClick={() => handleShoppingCardItems(item)}
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
    >
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">

        <div className="flex items-center gap-2">
          {getCategoryIcon(item.category)}
        </div>

        <label htmlFor="counter-input" className="sr-only">
          Anzahl:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <input
              type="text"
              id="counter-input-3"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              placeholder=""
              defaultValue={item.stock}
              required
            />
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              {item.price} G
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {item.name}
          </a>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => deleteItem(item._id)}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
