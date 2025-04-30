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
// Definierar props-typ för Book-komponenten. Den förväntar sig ett 'book'-objekt med specifika fält

const Book: React.FC<BookProps> = ({ book }) => {
  // Skapar en funktionell React-komponent som tar emot en 'book'-prop

  const authors = Array.isArray(book.author) ? book.author : [book.author];
  // Säkerställer att författaren alltid är en array, oavsett om det kommer som en sträng eller array

  return (
    <Link to={`/book/${book.id}`} className="book-link">
      {/* Bookrutan klickbar, länkar till detaljsidan för boken */}

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
