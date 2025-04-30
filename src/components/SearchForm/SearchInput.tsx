import React from 'react';
import { FaSearch } from 'react-icons/fa';
// Definierar vilka props komponenten tar emot
interface SearchInputProps {
  searchValue: string;

  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Funktion som hanterar ändringar när användaren skriver i inputfältet
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  handleInputChange,
}) => {
  // Funktionell komponent som tar emot props för värde och förändringshantering

  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        className="form-control"
        placeholder="The Lost World ..."
        id="search-input"
        // Unikt ID för inputfältet, kan användas för styling eller testning
        value={searchValue}
        // Inputfältets nuvarande värde, styrs av props (controlled component)
        onChange={handleInputChange}
        // När användaren skriver i fältet körs denna funktion
      />

      <button type="submit" className="search-btn" aria-label="Search">
        {/* Sökknapp med typ "submit", inkluderar tillgänglighetsattribut */}

        <FaSearch className="search-icon" />
        {/* Ikonen för förstoringsglas, visar att detta är en sökknapp */}
      </button>
    </div>
  );
};

export default SearchInput;
