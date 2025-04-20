import React from 'react';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import './Header.scss';

const Header = () => {
  return (
    <div className="holder">
      <header className="header">
        <Navbar />
        <div className="header-content flex-c text-center text-white"></div>
        <h2 className="header-title">find your book of choice</h2>
        <br />
        <p className="header-text fs-18 fw-3">
          Explore our library and find your next favorite book
        </p>
        <SearchForm />
      </header>
    </div>
  );
};

export default Header;
