import React, { useState, useEffect, useCallback } from 'react';
import { useGlobalContext } from '../../context/BookContext';
import './SearchForm.scss';
import SearchInput from './SearchInput';
// Importerar återanvändbar komponent för sökfältet

const SearchForm: React.FC = () => {
  // Definierar en funktionell komponent av typen React.FC

  const { setSearchTerm, setResultTitle } = useGlobalContext();
  // Hämtar funktioner från BookContext: sätt sökterm och resultattext

  const [searchValue, setSearchValue] = useState('');
  // Lokal state för det användaren skriver i sökrutan

  useEffect(() => {
    const inputElement = document.getElementById('search-input');
    // Hämtar inputfältet via ID

    if (inputElement) inputElement.focus();
    // Sätter automatiskt fokus på inputfältet när sidan laddas
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Förhindrar att formuläret skickas och sidan laddas om

      const tempSearchTerm = searchValue.trim();
      // Tar bort whitespace från början och slutet

      if (tempSearchTerm.replace(/[^\w]/gi, '').length === 0) {
        // Om inputen bara är specialtecken eller tom

        setSearchTerm('the lost world');
        // Sätter en default-sökterm

        setResultTitle('Please Enter Something ...');
        // Visar ett meddelande till användaren
      } else {
        setSearchTerm(tempSearchTerm);
        // Annars sök på det användaren skrev in
      }

      const bookListSection = document.getElementById('booklist');
      // Hittar sektionen med boklistan

      if (bookListSection) {
        bookListSection.scrollIntoView({ behavior: 'smooth' });
        // Scrollar mjukt ner till boklistan
      }
    },
    [searchValue, setSearchTerm, setResultTitle]
    // useCallback beroende på dessa värden
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // Uppdaterar searchValue varje gång användaren skriver något
  };

  return (
    <div className="search-section">
      <div className="container">
        <div className="search-content">
          <form className="search-form" onSubmit={handleSubmit}>
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
