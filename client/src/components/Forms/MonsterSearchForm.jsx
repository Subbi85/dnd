import React, { useState, useEffect } from "react";

const Monstersearch = () => {
  const [query, setQuery] = useState("mimic");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSpell, setSelectedSpell] = useState(null);

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
          `https://www.dnd5eapi.co/api/monsters?name=${query}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.results || []);
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

  const fetchSpellDetails = async (spell) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.dnd5eapi.co${spell.url}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setSelectedSpell(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSpellImage = (spellName) => {
    
    const formattedName = spellName.toLowerCase().replace(/\s+/g, "-");
    return `https://www.dnd5eapi.co/api/images/monsters/${formattedName}.png`;
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <form>
        <div style={{ marginBottom: "20px" }}>
            <div className="relative z-0 w-1/2 mb-5 group">
              <input onChange={(e) => setQuery(e.target.value)} value={query} type="text" placeholder="" name="spell-search" id="spell-search" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
              <label htmlFor="spell-search" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zaubername</label>
            </div>
        </div>
      </form>


      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {results.length > 0 ? (
          results.map((spell) => (
            <div
              key={spell.index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                background: "#f9f9f9",
                width: "200px",
                textAlign: "center",
              }}
              onClick={() => fetchSpellDetails(spell)}
            >
              <img
                src={getSpellImage(spell.name)}
                alt={spell.name}
                style={{ width: "100%", borderRadius: "4px", marginBottom: "10px" }}
              />
              <h3 style={{ margin: "0 0 10px" }}>{spell.name}</h3>
              <p style={{ fontSize: "14px", color: "#666" }}>Click for details</p>
            </div>
          ))
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>

      {selectedSpell && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "#fff",
          }}
        >
            <h2>{selectedSpell.name || "Unknown Monster"}</h2>
            <img
            src={getSpellImage(selectedSpell.name || "placeholder")}
            alt={selectedSpell.name || "No Image Available"}
            style={{ width: "200px", borderRadius: "4px", marginBottom: "10px" }}
            />
            <p>
            <strong>Size:</strong> {selectedSpell.size || "Unknown"}
            </p>
            <p>
            <strong>Type:</strong> {selectedSpell.type || "Unknown"}
            </p>
            <p>
            <strong>Alignment:</strong> {selectedSpell.alignment || "Unknown"}
            </p>
            <p>
            <strong>Hit Points:</strong> {selectedSpell.hit_points || "Unknown"}
            </p>
            <p>
            <strong>Armor Class:</strong> {selectedSpell.armor_class || "Unknown"}
            </p>
            <p>
            <strong>Challenge Rating:</strong> {selectedSpell.challenge_rating || "Unknown"}
            </p>

            <p>
            <strong>Description:</strong>
            </p>
            <p>
            <strong>Actions:</strong>
            </p>
            <ul>
            {selectedSpell.actions && selectedSpell.actions.length > 0 ? (
            selectedSpell.actions.map((action, index) => (
                <li key={index}>
                    <strong>{action.name || "Unnamed Action"}</strong>:{" "}
                
                    {typeof action.desc === "string"
                    ? action.desc
                    : action.desc && typeof action.desc === "object"
                    ? JSON.stringify(action.desc)  // Fallback bei Objekten
                    : "No description available."}
                </li>
                ))
            ) : (
                <li>No actions available.</li>
            )}
            </ul>
        </div>
      )}
    </div>
  );
};

export default Monstersearch;
