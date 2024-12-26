import React from 'react'

//Components
import ItemsList from '../components/ItemList'
import SearchItemForm from '../components/Forms/SearchItemForm'

const Marktplatz = () => {
  return (
    <>
    <div className="container mx-auto">
      <ItemsList />
      <SearchItemForm />
    </div>
    </>
  )
}

export default Marktplatz