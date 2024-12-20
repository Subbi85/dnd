import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
        <Link to="/" className=''>Home</Link>
        <Link to="/markt">Markt</Link>
        <Link to="/inventar">Inventar</Link>
        <Link to="/monsters">Monster</Link>
    </>
  )
}

export default Navbar