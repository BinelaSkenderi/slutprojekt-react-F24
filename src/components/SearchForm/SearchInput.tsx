import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
  searchValue: string; // Värdet för inputfältet
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Funktion för att uppdatera värdet
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  handleInputChange,
}) => {
  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        className="form-control"
        placeholder="The Lost World ..."
        id="search-input"
        value={searchValue} // Sätt värdet på inputen från komponentens state
        onChange={handleInputChange} // Hantera förändringarna i inputen
      />
      <button type="submit" className="search-btn" aria-label="Search">
        <FaSearch className="search-icon" />
      </button>
    </div>
  );
};

export default SearchInput;
