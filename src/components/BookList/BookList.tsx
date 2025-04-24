import React from 'react';
import { useGlobalContext } from '../../context';
import Book from '../BookList/Book';
import Loading from '../Loader/Loader';
import coverImg from '../../images/covernotfound.png';
import './BookList.scss';

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();

  if (loading) return <Loading />;

  const booksWithCovers = books.map(book => ({
    ...book,
    id: book.id.replace('/works/', ''),
    cover_img: book.cover_id
      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
      : coverImg,
  }));

  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="booklist-content grid">
          {booksWithCovers.slice(0, 30).map((item, index) => (
            <Book key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;
