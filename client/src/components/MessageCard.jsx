import React from 'react'

//Icons
import { CgDanger } from "react-icons/cg";

const MessagesDisplay = ({message, index}) => {

  return (
    <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
        <div>
          <div className='flex flex-row align-middle'>
            <CgDanger size={20} />
            <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">{message.headline}</h3>
          </div>
          <p className="text-base font-medium text-body-color">{message.message}</p>
          <p className=''> -- {message.user}</p>
        </div>
      </div>
    </div>
  )
}

export default MessagesDisplay