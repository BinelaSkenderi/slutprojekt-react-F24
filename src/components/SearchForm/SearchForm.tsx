import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchForm.scss';

const SearchForm = () => {
  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <form className="search-form">
            <div className="search-form-elem flex flex-sb bg-wh">
              <input
                type="text"
                className="`form-cotrol"
                placeholder="The Lost World ..."
              />
              <button type="submit" className="flex flex-c">
                <FaSearch className="text-purple" size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
