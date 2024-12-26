import React, { useState, useEffect } from "react"

// Components
import MessageDisplay from "../components/MessageDisplay";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-gray-800 p-4 rounded col-span-2 flex flex-row">
          <MessageDisplay />
        </div>
        <div className="bg-green-500 text-white p-4 rounded">Charaktere</div>
        <div className="bg-red-500 text-white p-4 rounded">Neueste Items</div>
        <div className="bg-yellow-500 text-black p-4 rounded">Item 4</div>
      </div>
    </div>
  );
};

export default Home;
