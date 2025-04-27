import React from 'react';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

// Skapa ett interface för props
interface NavbarTogglerProps {
  toggleMenu: boolean; // toggleMenu ska vara en boolean
  handleToggleMenu: () => void; // handleToggleMenu ska vara en funktion utan parametrar som returnerar void (inget värde)
}

const NavbarToggler: React.FC<NavbarTogglerProps> = ({
  toggleMenu,
  handleToggleMenu,
}) => {
  return (
    <button onClick={handleToggleMenu} className="navbar-toggler-btn">
      {toggleMenu ? (
        <HiX size={35} className="menu-icon active" /> // Visa "X" när menyn är öppen
      ) : (
        <HiOutlineMenuAlt3 size={35} className="menu-icon" /> // Visa hamburgermenyn när den är stängd
      )}
    </button>
  );
};

export default NavbarToggler;
