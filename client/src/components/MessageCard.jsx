import React from 'react'

//Icons
import { CgDanger } from "react-icons/cg";

const MessagesDisplay = ({message, index}) => {

  return (
<div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
  <div className="mb-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow transition-all hover:shadow-lg">
    <div>
      {/* Flexbox für Icon und Headline */}
      <div className="flex items-center mb-4">
        <CgDanger size={24} className="text-red-500 mr-2" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {message.headline}
        </h3>
      </div>
      {/* Nachrichtentext */}
      <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
        {message.message}
      </p>
      {/* Benutzername */}
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        -- {message.user}
      </p>
    </div>
  </div>
</div>
  )
}

export default MessagesDisplay