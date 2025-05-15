import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Language {
  key: string;
  name: string;
}

interface LanguageDetails {
  name?: string;
  description?: string | { value: string };
}

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  authors?: { name: string }[];
  cover_i?: number;
  cover_id?: number;
}

const LanguagePage: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(
    null
  );
  const [languageDetails, setLanguageDetails] =
    useState<LanguageDetails | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://openlibrary.org/languages.json');
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Unexpected response format');
        const sorted = data
          .filter((lang: Language) => lang.name)
          .sort((a, b) =>
            a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
          );
        setLanguages(sorted);
      } catch (err) {
        console.error('Failed to fetch languages:', err);
        setError(true);
      }
    };
    fetchLanguages();
  }, []);

  const handleLanguageSelect = async (languageId: string) => {
    setSelectedLanguageId(languageId);
    setLanguageDetails(null);
    setBooks([]);
    setLoadingDetails(true);
    setLoadingBooks(true);

    try {
      const detailsRes = await fetch(
        `https://openlibrary.org/languages/${languageId}.json`
      );
      const detailsData = await detailsRes.json();
      setLanguageDetails(detailsData);
    } catch (err) {
      console.error('Error fetching language details:', err);
      setLanguageDetails(null);
    } finally {
      setLoadingDetails(false);
    }

    try {
      const booksRes = await fetch(
        `https://openlibrary.org/search.json?language=${languageId}&limit=100`
      );
      const booksData = await booksRes.json();

      let filteredBooks = (booksData.docs || []).filter(
        (book: Book) => book.cover_i
      );

      if (filteredBooks.length < 10) {
        const fallbackRes = await fetch(
          `https://openlibrary.org/subjects/${languageId}.json?limit=100`
        );
        const fallbackData = await fallbackRes.json();

        const fallbackBooks = (fallbackData.works || []).filter(
          (book: Book) => book.cover_id
        );

        filteredBooks = [...filteredBooks, ...fallbackBooks].slice(0, 10);
      } else {
        filteredBooks = filteredBooks.slice(0, 10);
      }

      setBooks(filteredBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
      setBooks([]);
    } finally {
      setLoadingBooks(false);
    }
  };

  const getCoverUrl = (book: Book) => {
    const id = book.cover_i || book.cover_id;
    return id
      ? `https://covers.openlibrary.org/b/id/${id}-M.jpg`
      : 'https://via.placeholder.com/128x193?text=No+Cover';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <div className="back-link" style={{ marginBottom: '1rem' }}>
        <Link to="/">← Back to Home</Link>
      </div>

      <h2 style={{ textAlign: 'center' }}>Languages</h2>

      <select
        onChange={e => handleLanguageSelect(e.target.value)}
        defaultValue=""
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          marginBottom: '1rem',
        }}
      >
        <option value="" disabled>
          -- Select a language --
        </option>
        {languages.map(lang => (
          <option key={lang.key} value={lang.key.replace('/languages/', '')}>
            {lang.name}
          </option>
        ))}
      </select>

      {error && (
        <p style={{ color: 'red' }}>
          Something went wrong while fetching languages.
        </p>
      )}

      {selectedLanguageId && (
        <div style={{ marginTop: '1rem' }}>
          {loadingDetails ? (
            <p>Loading language details...</p>
          ) : languageDetails ? (
            <>
              <h3>{languageDetails.name}</h3>
              <p>
                {typeof languageDetails.description === 'string'
                  ? languageDetails.description
                  : languageDetails.description?.value || 'No description.'}
              </p>
            </>
          ) : (
            <p>No details found for this language.</p>
          )}

          <h4 style={{ marginTop: '2rem' }}>Books in this language</h4>
          {loadingBooks ? (
            <p>Loading books...</p>
          ) : books.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem',
              }}
            >
              {books.map(book => (
                <Link
                  to={`/book/${book.key.replace('/works/', '')}`}
                  key={book.key}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={getCoverUrl(book)}
                      alt={book.title}
                      style={{
                        width: '100px',
                        height: '150px',
                        objectFit: 'cover',
                      }}
                    />
                    <h5 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>
                      {book.title}
                    </h5>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>
                      {book.author_name?.join(', ') ||
                        book.authors?.map(a => a.name).join(', ') ||
                        'Unknown author'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No books found in this language.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LanguagePage;
