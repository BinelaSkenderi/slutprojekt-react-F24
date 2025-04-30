import React, { useState } from 'react';
import './CategoryPage.scss';
import { Link } from 'react-router-dom';

type Book = {
  key: string;
  title: string;
  authors?: { name: string }[];
};

const categories = [
  'fantasy',
  'science_fiction',
  'romance',
  'mystery',
  'horror',
  'history',
  'biographies',
  'thriller',
  'poetry',
];

const CategoryPage: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [books, setBooks] = useState<Record<string, Book[]>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggle = async (category: string) => {
    if (openCategory === category) {
      setOpenCategory(null);
      return;
    }

    setOpenCategory(category);

    if (!books[category]) {
      setLoading(category);
      try {
        const response = await fetch(
          `https://openlibrary.org/subjects/${category}.json`
        );
        const data = await response.json();
        setBooks(prev => ({ ...prev, [category]: data.works }));
      } catch (err) {
        console.error(`Error loading ${category}`, err);
      } finally {
        setLoading(null);
      }
    }
  };

  return (
    <div className="container category-page">
      <div className="back-link">
        <Link to="← /">← Back to Home</Link>
      </div>

      <h2 className="section-title">Välj en kategori</h2>

      <ul className="category-list">
        {categories.map(category => (
          <li key={category} className="category-item">
            <button onClick={() => handleToggle(category)}>
              {category.replace('_', ' ')}
            </button>

            {openCategory === category && (
              <div className="book-list">
                {loading === category ? (
                  <p>Laddar böcker...</p>
                ) : (
                  <ul>
                    {books[category]?.map(book => (
                      <li key={book.key}>
                        {book.title}
                        {book.authors && (
                          <span> – {book.authors[0]?.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
