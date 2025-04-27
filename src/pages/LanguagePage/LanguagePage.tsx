import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LanguagePage: React.FC = () => {
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://openlibrary.org/languages.json');
        const data = await response.json();
        setLanguages(data.languages || []);
      } catch (error) {
        console.error('Failed to fetch languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {languages.length > 0 ? (
          languages.map((language, index) => (
            <li key={index}>
              <Link to={`/language/${language}`}>{language}</Link>
            </li>
          ))
        ) : (
          <p>Loading languages...</p>
        )}
      </ul>
    </div>
  );
};

export default LanguagePage;
