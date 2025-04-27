import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarMenuProps {
  toggleMenu: boolean;
  handleToggleMenu: () => void;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  toggleMenu,
  handleToggleMenu,
}) => {
  return (
    <div
      className={
        toggleMenu ? 'navbar-collapse show-navbar-collapse' : 'navbar-collapse'
      }
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/about"
            className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarMenu;
