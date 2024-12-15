import React from 'react'
import './Navbar.sass'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

  return (
    <>
        <div className="navbar">
            <h1 className="navbar__title" onClick={() => navigate('/')}>
                CampusLocator
            </h1>

            <ul className="navbar__options">
                <li className="navbar__option" onClick={() => navigate('/profile')}>Profile</li>
                <li className="navbar__option" onClick={() => navigate('/about')}>About</li>
                <li className="navbar__option" onClick={() => navigate('/contact')}>Contact</li>
            </ul>
        </div>
    </>
  )
}

export default Navbar