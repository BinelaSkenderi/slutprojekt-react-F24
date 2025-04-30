import React, { useState, useEffect, useCallback } from 'react';
import { useGlobalContext } from '../../context/BookContext';
import { useNavigate } from 'react-router-dom';
import './SearchForm.scss';
import SearchInput from './SearchInput';

const SearchForm: React.FC = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext(); // Hämta funktioner från globalt state
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const inputElement = document.getElementById('search-input');
    if (inputElement) inputElement.focus();
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const tempSearchTerm = searchValue.trim();

      if (tempSearchTerm.replace(/[^\w]/gi, '').length === 0) {
        setSearchTerm('the lost world');
        setResultTitle('Please Enter Something ...');
      } else {
        setSearchTerm(tempSearchTerm);
      }

      // Skrolla ner till booklist
      const bookListSection = document.getElementById('booklist');
      if (bookListSection) {
        bookListSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [searchValue, setSearchTerm, setResultTitle]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-section">
      <div className="container">
        <div className="search-content">
          <form className="search-form" onSubmit={handleSubmit}>
            {/* Använd SearchInput och SearchButton komponenterna */}
            <SearchInput
              searchValue={searchValue}
              handleInputChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
