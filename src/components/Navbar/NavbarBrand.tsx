import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../images/loggoNew.png'; // Importera logotypbilden

const NavbarBrand = () => {
  return (
    <div className="brand-and-toggler flex flex-sb">
      <Link to={'/'} className="navbar-brand flex">
        <img src={logoImg} alt="site logo" />
        <span className="text-uppercase fw-7 fs-24 ls-1">Liberia</span>
      </Link>
    </div>
  );
};

export default NavbarBrand;
