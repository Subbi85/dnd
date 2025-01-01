import React, { useState, useEffect } from "react";

//Icons
import { GiFragmentedSword , GiLeatherArmor , GiTemplarEye } from "react-icons/gi";

const ItemFilter = ({ setFilteredItems, items }) => {
  const [name, setName] = useState("");
  const [rarity, setRarity] = useState("");
  const [category, setCategory] = useState(""); 

  useEffect(() => {
    let updatedItems = [...items];

    if (name) {
      updatedItems = updatedItems.filter(item =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (rarity) {
      updatedItems = updatedItems.filter(item =>
        item.rarity.toLowerCase() === rarity.toLowerCase()
      );
    }

    if (category) {
      updatedItems = updatedItems.filter(item =>
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredItems(updatedItems);
  }, [name, rarity, category, items, setFilteredItems]);

  return (
    <div className="flex gap-4 mb-4">
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Search by name..." 
        className="border px-4 py-2"
      />

      <select
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
        className="border px-4 py-2"
      >
        <option value="">Seltenheit</option>
        <option value="Common">Common</option>
        <option value="Uncommon">Uncommon</option>
        <option value="Rare">Rare</option>
        <option value="Very Rare">Very Rare</option>
        <option value="Epic">Epic</option>
        <option value="Legendary">Legendary</option>
      </select>

      <div className="flex gap-2">
        <button 
          className={`px-4 py-2 border ${category === "Weapon" ? "bg-gray-300 text-red-900" : ""}`} 
          onClick={() => setCategory(category === "Weapon" ? "" : "Weapon")}
        >
          <GiFragmentedSword size={40} />
        </button>
        <button 
          className={`px-4 py-2 border ${category === "Armor" ? "bg-gray-300 text-red-900" : ""}`} 
          onClick={() => setCategory(category === "Armor" ? "" : "Armor")}
        >
          <GiLeatherArmor size={40} />
        </button>
        <button 
          className={`px-4 py-2 border ${category === "Wondrous Item" ? "bg-gray-300 text-red-900" : ""}`} 
          onClick={() => setCategory(category === "Wondrous Item" ? "" : "Wondrous Item")}
        >
          <GiTemplarEye size={40} />
        </button>
      </div>
    </div>
  );
};

export default ItemFilter;
