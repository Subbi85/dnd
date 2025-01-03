import React, { useState } from "react";

//Icons
import { GiTemplarEye, GiMagicPortal  } from "react-icons/gi";
import { SiRedragon } from "react-icons/si";

//Components
import MagicItemSearch from "./Forms/SearchItemForm";
import MonsterSearch from "./Forms/MonsterSearchForm";
import SpellSearch from "./Forms/SpellSearchForm";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { name: "Items", icon: GiTemplarEye },
    { name: "Monster", icon: SiRedragon },
    { name: "Zauber", icon: GiMagicPortal },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Items":
        return <MagicItemSearch />;
      case "Monster":
        return <MonsterSearch />;
      case "Zauber":
        return <SpellSearch />;
      default:
        return <p>No content available for this tab.</p>;
    }
  };

  return (
    <div className="md:flex">
      <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <button
              onClick={() => !tab.disabled && setActiveTab(tab.name)}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                tab.disabled
                  ? "cursor-not-allowed bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                  : activeTab === tab.name
                  ? "text-white bg-blue-700 dark:bg-blue-600"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              disabled={tab.disabled}
            >
              <tab.icon className="w-4 h-4 me-2" />
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabsComponent;