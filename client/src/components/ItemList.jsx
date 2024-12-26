import React, { useState, useEffect } from "react";
import axios from "axios";

//Components
import ItemCard from "../ItemCard";
import ShopSummary from "./ShopSummary";

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
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Annas Arcaneum</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
            {filteredItems.map((item) => (
              <ItemCard item={item}/>
            ))}
            </div>
          </div>

              <ShopSummary />
        </div>
      </div>
    </section>
  );
};

export default ItemsList;
