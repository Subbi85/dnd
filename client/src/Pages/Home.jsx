import React, { useState, useEffect } from "react"

// Components
import MessageDisplay from "../components/MessageDisplay";
import CharacterModal from "../components/CharacterModal";

const Home = () => {
  return (

    <div className="container mx-auto">
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">

    <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-gray-800 p-4 rounded col-span-2 flex flex-row">
          <MessageDisplay />
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          <CharacterModal />
        </div>
        <div className="bg-red-500 text-white p-4 rounded">Neueste Items</div>
        <div className="bg-yellow-500 text-black p-4 rounded">Item 4</div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">

            </div>
          </div>

        </div>
      </div>
    </section>
    </div>



  );
};

export default Home;
