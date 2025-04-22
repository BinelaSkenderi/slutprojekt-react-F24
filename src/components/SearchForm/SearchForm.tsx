import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchForm.scss';

const SearchForm = () => {
  return (
    <div className="search-section">
      <div className="container">
        <div className="search-content">
          <form className="search-form">
            <div className="search-input-wrapper flex flex-sb bg-wh">
              <input
                type="text"
                className="form-control"
                placeholder="The Lost World ..."
              />
              <button type="submit" className="flex flex-c" aria-label="Search">
                <FaSearch className="text-purple" size={28} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
