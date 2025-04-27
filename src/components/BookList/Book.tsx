import React from 'react';

interface BookProps {
  book: {
    id: string;
    title: string;
    author: string | string[]; // author kan vara antingen en string eller en array
    cover_img: string;
  };
}

const Book: React.FC<BookProps> = ({ book }) => {
  // Kontrollera om author är en array, om inte, gör den till en array
  const authors = Array.isArray(book.author) ? book.author : [book.author];

  return (
    <div className="book">
      <div className="book-img">
        <img src={book.cover_img} alt={book.title} />
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{authors.join(', ')}</p>
      </div>
    </div>
  );
};

export default Book;
