import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Importerar sökikonen från react-icons
import './SearchForm.scss'; // Importerar tillhörande stilfil

// Funktionell komponent för sökformuläret
const SearchForm = () => {
  return (
    <div className="search-section">
      {/* Sektion för sökkomponenten */}
      <div className="container">
        {/* Begränsar bredden och centrerar innehållet */}
        <div className="search-content">
          {/* Wrapper för sökinnehållet */}
          <form className="search-form">
            {/* HTML-formulär för att hantera sökningen */}
            <div className="search-input-wrapper">
              {/* Wrapper för inputfältet och knappen */}
              <input
                type="text" // Textinmatningsfält
                className="form-control" // Klass för styling
                placeholder="The Lost World ..." // Visar exempeltext i fältet
              />
              <button type="submit" className="search-btn" aria-label="Search">
                {/* Knapp för att skicka formuläret, med tillgänglighetsbeskrivning */}
                <FaSearch className="search-icon" />
                {/* Sökikon visas inne i inputfältet */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
