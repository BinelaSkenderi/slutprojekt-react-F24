import React from 'react';
import { Link } from 'react-router-dom';
import './BookList.scss';

type BookProps = {
  id: string;
  title: string;
  author: string[];
  edition_count: number;
  first_publish_year: number;
  cover_img?: string;
};

const Book: React.FC<{ book: BookProps }> = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-link">
        <div className="book-cover">
          <img src={book.cover_img || '/default-cover.jpg'} alt={book.title} />
        </div>
        <div className="book-details">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">
            <strong>Author:</strong> {book.author.join(', ')}
          </p>
          <p className="book-edition">
            <strong>Editions:</strong> {book.edition_count}
          </p>
          <p className="book-year">
            <strong>First Published:</strong> {book.first_publish_year}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Book;
