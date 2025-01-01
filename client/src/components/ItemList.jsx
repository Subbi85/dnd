import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
import ShopSummary from "./ShopSummary";
import ItemFilter from "./Filter/ItemFilter";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [shoppingCardItems, setShoppingCardItems] = useState(() => {
    const storedItems = localStorage.getItem("shoppingCardItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

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

  useEffect(() => {
    localStorage.setItem("shoppingCardItems", JSON.stringify(shoppingCardItems));
  }, [shoppingCardItems]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Pass filteredItems and setFilteredItems to ItemFilter */}
        <ItemFilter 
          setFilteredItems={setFilteredItems} 
          items={items}
        />
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Annas Arcaneum
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {filteredItems.map((item, index) => (
                <ItemCard
                  item={item}
                  key={index}
                  shoppingCardItems={shoppingCardItems}
                  setShoppingCardItems={setShoppingCardItems}
                />
              ))}
            </div>
          </div>
          <ShopSummary shoppingCardItems={shoppingCardItems} 
                       setShoppingCardItems={setShoppingCardItems} />
        </div>
      </div>
    </section>
  );
};

export default ItemsList;
