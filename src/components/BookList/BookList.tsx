import React from 'react';
import { useGlobalContext } from '../../context/BookContext';
import Book from './Book'; // Korrekt import
import Loading from '../Loader/Loader';
import coverImg from '../../images/covernotfound.png';
import './BookList.scss';

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();

  const booksWithCovers = books.map(singlebook => ({
    ...singlebook,
    id: singlebook.id.replace('/works/', ''),
    cover_img: singlebook.coverId
      ? `https://covers.openlibrary.org/b/id/${singlebook.coverId}-L.jpg`
      : coverImg,
  }));

  if (loading) return <Loading />;

  return (
    <section className="booklist" id="booklist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="booklist-content grid">
          {booksWithCovers.slice(0, 30).map(item => (
            <Book key={item.id} book={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;
