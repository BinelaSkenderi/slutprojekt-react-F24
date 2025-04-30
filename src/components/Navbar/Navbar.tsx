import React, { useState } from 'react';
import './Navbar.scss';
import NavbarBrand from './NavbarBrand';
import NavbarToggler from './NavbarToggler';
import NavbarMenu from './NavbarMenu';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  // Toggle menu visibility
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-content flex">
        <NavbarBrand />

        <NavbarToggler
          toggleMenu={toggleMenu}
          handleToggleMenu={handleToggleMenu} // Skickar rätt funktion
        />

        <NavbarMenu
          toggleMenu={toggleMenu} // Skickar statusen för menyn
          handleToggleMenu={handleToggleMenu} // Skickar rätt funktion för att ändra menyn
        />
      </div>
    </nav>
  );
};

export default Navbar;
