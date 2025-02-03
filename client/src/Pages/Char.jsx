import React from 'react'
import InventarDisplay from '../components/InventarDisplay'

const Char = () => {
  return (
    <div className="container mx-auto">
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                  <InventarDisplay />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Char