import React from 'react';
import { Link } from 'react-router-dom';

interface BookProps {
  book: {
    id: string;
    title: string;
    author: string | string[];
    cover_img: string;
  };
}

const Book: React.FC<BookProps> = ({ book }) => {
  const authors = Array.isArray(book.author) ? book.author : [book.author];

  return (
    <Link to={`/book/${book.id}`} className="book-link">
      <div className="book">
        <div className="book-img">
          <img src={book.cover_img} alt={book.title} />
        </div>
        <div className="book-info">
          <h3>{book.title}</h3>
          <p>{authors.join(', ')}</p>
        </div>
      </div>
    </Link>
  );
};

export default Book;
