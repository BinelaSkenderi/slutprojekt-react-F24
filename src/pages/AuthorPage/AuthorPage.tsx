import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AuthorPage: React.FC = () => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          'https://openlibrary.org/authors.json?limit=50'
        );
        const data = await response.json();

        if (!data || !data.entries) {
          setError(true);
          return;
        }

        setAuthors(data.entries);
      } catch (error) {
        console.error('Failed to fetch authors:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div>
      <h2>Authors</h2>
      {loading ? (
        <p>Loading authors...</p>
      ) : error ? (
        <p>Something went wrong while fetching the authors.</p>
      ) : (
        <ul>
          {authors.length > 0 ? (
            authors.map((author: any) => (
              <li key={author.key}>
                <Link to={`/author/${author.key}`}>{author.name}</Link>
              </li>
            ))
          ) : (
            <p>No authors found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AuthorPage;
