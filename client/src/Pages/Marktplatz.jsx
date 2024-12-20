import React from 'react'

//Components
import ItemsList from '../components/ItemList'
import SearchItemForm from '../components/Forms/SearchItemForm'

const Marktplatz = () => {
  return (
    <>
    <div>Marktplatz</div>
      <ItemsList />
      <SearchItemForm />
    </>
  )
}

export default Marktplatz