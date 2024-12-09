import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemsList = () => {
  const [items, setItems] = useState([]); 
  const [filteredItems, setFilteredItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Filter States
  const [filterName, setFilterName] = useState(""); 
  const [filterRarity, setFilterRarity] = useState(""); 
  const [filterPrice, setFilterPrice] = useState(""); 

  // Items abrufen
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/items");
      setItems(response.data); 
      setFilteredItems(response.data); 
      setLoading(false);
    } catch (err) {
      setError("Fehler beim Abrufen der Items");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Filterfunktion
  const filterItems = () => {
    let filtered = items;

    // Nach Name filtern
    if (filterName.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    // Nach Seltenheit filtern
    if (filterRarity.trim() !== "") {
      filtered = filtered.filter(
        (item) => item.rarity.toLowerCase() === filterRarity.toLowerCase()
      );
    }

    // Nach Preis filtern
    if (filterPrice.trim() !== "") {
      const price = parseInt(filterPrice, 10); // Preis als Zahl
      filtered = filtered.filter((item) => item.price <= price);
    }

    setFilteredItems(filtered);
  };

  // Filter aktualisieren und Items neu filtern
  const handleFilterChange = (e, filterType) => {
    const value = e.target.value;

    if (filterType === "name") {
      setFilterName(value);
    } else if (filterType === "rarity") {
      setFilterRarity(value);
    } else if (filterType === "price") {
      setFilterPrice(value);
    }

    // Filter Items nach dem Update
    filterItems();
  };

  // Zurücksetzen-Funktion
  const resetFilters = () => {
    setFilterName(""); 
    setFilterRarity(""); 
    setFilterPrice("");
    setFilteredItems(items);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="items-list">
      {/* Filtereingaben */}
      <div className="filters">
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name filtern"
            value={filterName}
            onChange={(e) => handleFilterChange(e, "name")}
          />
        </div>
        <div>
          <label>Seltenheit:</label>
          <select
            value={filterRarity}
            onChange={(e) => handleFilterChange(e, "rarity")}
          >
            <option value="">Alle</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>
        <div>
          <label>Maximaler Preis (Gold):</label>
          <input
            type="number"
            placeholder="Maximaler Preis"
            value={filterPrice}
            onChange={(e) => handleFilterChange(e, "price")}
          />
        </div>
        <button onClick={resetFilters}>Filter zurücksetzen</button>
      </div>

      <ul>
        {filteredItems.map((item) => (
          <li key={item._id} className="text-black">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Preis: {item.price} Gold</p>
            <p>Seltenheit: {item.rarity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
