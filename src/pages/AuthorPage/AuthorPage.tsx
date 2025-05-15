import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Author {
  key: string;
  name: string;
}

interface Book {
  key: string;
  title: string;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AuthorPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [selectedAuthorKey, setSelectedAuthorKey] = useState<string | null>(
    null
  );
  const [authorBooks, setAuthorBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(false);
  const [errorBooks, setErrorBooks] = useState<boolean>(false);

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

        // Sortera och filtrera författare som börjar med vald bokstav
        const filtered = data.docs.filter(
          (a: Author) =>
            a.name?.toUpperCase().startsWith(selectedLetter) &&
            a.name.length > 2 // Ta bort väldigt korta namn
        );

        // Använd Set för att hålla koll på unika namn
        const uniqueNames = new Set<string>();
        const uniqueAuthors = filtered.filter((author: { name: string }) => {
          if (uniqueNames.has(author.name)) {
          } else {
            uniqueNames.add(author.name);
            return true; // ny författare, behåll
          }
        });

        // Sortera efter namn först efter filtrering och unika
        uniqueAuthors.sort((a: { name: string }, b: { name: any }) =>
          a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
        );

        setAuthors(uniqueAuthors);
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

  const fetchAuthorBooks = async (authorKey: string) => {
    setLoadingBooks(true);
    setErrorBooks(false);
    setAuthorBooks([]);
    try {
      const response = await fetch(
        `https://openlibrary.org/authors/${authorKey}/works.json`
      );
      const data = await response.json();
      if (data && data.entries) {
        setAuthorBooks(data.entries);
      } else {
        setAuthorBooks([]);
      }
    } catch (error) {
      console.error('Failed to fetch author books:', error);
      setErrorBooks(true);
    } finally {
      setLoadingBooks(false);
    }
  };

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
            onClick={() => {
              setSelectedLetter(letter);
              setSelectedAuthorKey(null); // Reset vald författare vid byte av bokstav
              setAuthorBooks([]);
            }}
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

      {/* Författarlista */}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading authors...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>
          Something went wrong while fetching the authors.
        </p>
      ) : authors.length > 0 ? (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {authors.map(author => (
            <li
              key={author.key}
              style={{
                marginBottom: '0.5rem',
                cursor: 'pointer',
                color: selectedAuthorKey === author.key ? '#007BFF' : '#333',
                textDecoration:
                  selectedAuthorKey === author.key ? 'underline' : 'none',
              }}
              onClick={() => {
                const cleanKey = author.key.replace('/authors/', '');
                setSelectedAuthorKey(author.key);
                fetchAuthorBooks(cleanKey);
              }}
            >
              {author.name}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center' }}>
          No authors found for "{selectedLetter}".
        </p>
      )}

      {selectedAuthorKey && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Böcker av vald författare</h3>
          {loadingBooks ? (
            <p>Loading books...</p>
          ) : errorBooks ? (
            <p style={{ color: 'red' }}>Failed to load books.</p>
          ) : authorBooks.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              {authorBooks.map(book => (
                <div
                  key={book.key}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '1rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    backgroundColor: '#fff',
                    cursor: 'default',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.transform = 'scale(1.03)')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  <h4
                    style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.1rem',
                      color: '#007BFF',
                    }}
                  >
                    {book.title}
                  </h4>
                </div>
              ))}
            </div>
          ) : (
            <p>Inga böcker hittades för den här författaren.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorPage;
