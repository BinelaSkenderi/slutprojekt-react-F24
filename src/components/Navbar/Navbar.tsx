import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logoImg from '../../images/logobild.jpg';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Navbar = () => {
  const [toggelMenu, setToggelMenu] = useState(false);
  const handleNavbar = () => setToggelMenu(!toggelMenu);

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-contetn flex">
        <div className="brand-andtoggler flex flex-sb">
          <Link to={'/'} className="navbar-brand flex">
            <img src={logoImg} alt="site logo" />
            <span className="text-uppercase fw-7 fs-24 ls-1">Liberia</span>
          </Link>
          <button
            type="button"
            className="navbar-toggler-btn"
            onClick={handleNavbar}
          >
            <HiOutlineMenuAlt3
              size={35}
              style={{
                color: `${toggelMenu ? '#fff' : '#010101'}`,
              }}
            />
          </button>
        </div>

        <div
          className={
            toggelMenu
              ? 'navbar-collapse show-navbar-collapse'
              : 'navbar-collapse'
          }
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="book"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="about"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                about
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
