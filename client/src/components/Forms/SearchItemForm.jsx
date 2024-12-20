import React, { useState, useEffect } from "react";

const MagicItemSearch = () => {
  const [query, setQuery] = useState(""); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (query === "") {
      setResults([]); 
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.dnd5eapi.co/api/magic-items?name=${query}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.results || []); 
        console.log(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

      
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300); 

    return () => clearTimeout(delayDebounceFn); 
  }, [query]);

  const fetchItemDetails = async (item) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.dnd5eapi.co${item.url}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setSelectedItem(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendItemToShop = async () => {
    if (!selectedItem) return;

    console.log(selectedItem)

    try {
      const response = await fetch("http://localhost:4000/api/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedItem),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      alert(`Item added to the shop: ${data.name}`);
    } catch (err) {
      alert(`Failed to add item: ${err.message}`);
    }
  };

  const deleteItemFromShop = async(item)=>{

  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Magic Item Search</h1>
      <input
        type="text"
        placeholder="Search for a magic item..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div>
        {results.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {results.map((item) => (
              <li
                key={item.index}
                className="text-black"
                style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px", cursor: "pointer" }}
                onClick={() => fetchItemDetails(item)}
              >
                <h3>{item.name}</h3>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>

      {selectedItem && 
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <p><strong>Name:</strong> {selectedItem.name}</p>
          
          <ul>
            <p><strong>Description:</strong></p>{selectedItem.desc}
            <p><strong>Seltenheit:</strong></p>{selectedItem.rarity.name}
            <p>{selectedItem.id}</p>
          </ul>
          <p>
            <a href={`https://www.dnd5eapi.co${selectedItem.url}`} target="_blank" rel="noopener noreferrer">
              View Full Details...
            </a>
          </p>
          <button className="p-2" onClick={sendItemToShop}>In den Shop</button>
        </div>
      }
    </div>
  );
};

export default MagicItemSearch;
