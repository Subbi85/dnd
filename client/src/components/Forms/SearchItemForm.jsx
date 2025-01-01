import React, { useState, useEffect } from "react";

const MagicItemSearch = () => {
  const [query, setQuery] = useState(""); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [price, setPrice] = useState(""); 
  const [stock, setStock] = useState("");

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
    if (!selectedItem || !selectedItem.name) {
      console.log("Selected item is invalid or missing a name");
      return;
    }

    const newItem = { 
      name: selectedItem.name,
      desc: selectedItem.desc,
      price: parseFloat(price),
      stock: parseInt(stock),
      rarity: selectedItem.rarity
    };
    
    try {
      const response = await fetch("http://localhost:4000/api/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem), 
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(`Item added to the shop: ${data.name}`);
    } catch (err) {
      console.log(`Failed to add item: ${err.message}`);
    }
  };
  
  return (
    <div style={{fontFamily: "Arial, sans-serif" }}>

      <section className="grid grid-cols-3"> 
      <div className="dark:bg-gray-900 col-span-2">
        <div className="flex flex-wrap">
          {results.length > 0 ? (
            <>
              {results.map((item) => (
                <div
                  key={item.index}
                  className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  onClick={() => fetchItemDetails(item)} 
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </>
            
          ) : (
            !loading && <p>Bisher keine Ergebnisse</p>
          )}

        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <div className="space-y-4">

            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <div className="space-y-4">
              <form className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                  <input onChange={(e) => setQuery(e.target.value)} value={query} type="text" placeholder=" " name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                  <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Itemsuche</label>
                </div>

                {selectedItem && 
                  <>
                    <p><strong>Name:</strong> {selectedItem.name}</p>
                    <ul>
                      <p><strong>Description:</strong></p>{selectedItem.desc}
                      <p><strong>Seltenheit:</strong></p>{selectedItem.rarity.name}
                      <p>{selectedItem.id}</p>
                    </ul>

                    <div style={{ marginBottom: "10px" }}>
                      <label>Price: </label>
                      <input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        style={{ marginLeft: "5px" }} 
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label>Stock: </label>
                      <input 
                        type="number" 
                        value={stock} 
                        onChange={(e) => setStock(e.target.value)} 
                        style={{ marginLeft: "5px" }} 
                      />
                    </div>

                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={sendItemToShop}>In den Shop</button>
                  </>
                }
              </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MagicItemSearch;
