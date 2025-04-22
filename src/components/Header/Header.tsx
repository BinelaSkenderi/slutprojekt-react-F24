import React from 'react';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import './Header.scss';

const Header = () => {
  return (
    <div className="holder">
      <header className="header">
        <Navbar />
        <div className="header-content flex-c text-center text-white">
          <h1 className="header-title">Discover Your Next Great Book</h1>
          <p className="header-text fs-18 fw-3">
            Explore our library and find your next favorite story.
          </p>
          <SearchForm />
        </div>
      </header>
    </div>
  );
};

export default Header;
