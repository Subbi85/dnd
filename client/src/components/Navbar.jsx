import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
        <Link to="/" className='text-red-500'>Home</Link>
        <Link to="/markt">Markt</Link>
        <Link to="/inventar">Inventar</Link>
    </>
  )
}

export default Navbar