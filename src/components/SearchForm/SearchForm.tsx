import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importerar sökikonen från react-icons
import './SearchForm.scss'; // Importerar tillhörande stilfil
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const [searchValue, setSearchValue] = useState(''); // Använder useState för att hantera inputvärdet
  const navigate = useNavigate();

  // Sätt fokus på inputfältet när komponenten renderas
  useEffect(() => {
    const inputElement = document.getElementById('search-input');
    if (inputElement) inputElement.focus();
  }, []);

  // Hanterar formulärets submit och gör sökningen
  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault(); // Förhindrar att sidan laddas om

      let tempSearchTerm = searchValue.trim(); // Hämtar det aktuella värdet och tar bort mellanslag

      if (tempSearchTerm.replace(/[^\w]/gi, '').length === 0) {
        setSearchTerm('the lost world');
        setResultTitle('Please Enter Something ...');
      } else {
        setSearchTerm(tempSearchTerm); // Om det är ett giltigt sökord, sätt det i global state
      }

      navigate('/book'); // Navigera till /book-sidan
    },
    [searchValue, setSearchTerm, setResultTitle, navigate] // beroenden för useCallback
  );

  // Uppdatera sökfältets värde när användaren skriver
  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-section">
      <div className="container">
        <div className="search-content">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
              <input
                type="text" // Textinmatningsfält
                className="form-control" // Klass för styling
                placeholder="The Lost World ..."
                id="search-input" // Lägg till id för att referera till inputfältet
                value={searchValue} // Koppla input till state
                onChange={handleInputChange} // Uppdatera state när användaren skriver
              />
              <button type="submit" className="search-btn" aria-label="Search">
                <FaSearch className="search-icon" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
