import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Author {
  key: string;
  name: string;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AuthorPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search/authors.json?q=${selectedLetter.toLowerCase()}`
        );
        const data = await response.json();

        if (!data || !data.docs) {
          setError(true);
          return;
        }

        const sorted = data.docs
          .filter((a: Author) =>
            a.name?.toUpperCase().startsWith(selectedLetter)
          )
          .sort((a: Author, b: Author) =>
            a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
          );

        setAuthors(sorted);
        setFilteredAuthors(sorted);
        setError(false);
      } catch (err) {
        console.error('Failed to fetch authors:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [selectedLetter]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <div className="back-link">
        <Link to="/">← Back to Home</Link>
      </div>

      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Authors A–Z</h2>

      {/* A–Z Filter Buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '5px',
          marginBottom: '1.5rem',
        }}
      >
        {ALPHABET.map(letter => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            style={{
              padding: '8px 12px',
              backgroundColor:
                selectedLetter === letter ? '#007BFF' : '#f0f0f0',
              color: selectedLetter === letter ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              minWidth: '30px',
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Result Area */}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading authors...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>
          Something went wrong while fetching the authors.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {filteredAuthors.length > 0 ? (
            filteredAuthors.map(author => (
              <li key={author.key} style={{ marginBottom: '0.5rem' }}>
                <Link
                  to={`/author/${author.key.replace('/authors/', '')}`}
                  style={{ textDecoration: 'none', color: '#333' }}
                >
                  {author.name}
                </Link>
              </li>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>
              No authors found for "{selectedLetter}".
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AuthorPage;
