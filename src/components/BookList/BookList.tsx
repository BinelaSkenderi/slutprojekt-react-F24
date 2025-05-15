import React from 'react';
import { useGlobalContext } from '../../context/BookContext';
import Book from './Book';
import Loading from '../Loader/Loader';
import coverImg from '../../images/covernotfound.png';
import './BookList.scss';

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();
  // Hämtar böcker, laddningsstatus och resultattext från global context

  const booksWithCovers = books.map(singlebook => ({
    // 1. Kopiera alla befintliga fält från varje bok-objekt
    ...singlebook,

    // 2. Ändra id: ta bort prefixet "/works/" från original-id:t
    id: singlebook.id.replace('/works/', ''),

    // 3. Lägg till ett fält cover_img som går till rätt bild
    cover_img: singlebook.coverId
      ? // Om det finns en coverId, bygg en URL till OpenLibrary
        `https://covers.openlibrary.org/b/id/${singlebook.coverId}-L.jpg`
      : coverImg,
    // Annars använd en standardbild som du har sparat i variabeln coverImg
  }));

  if (loading) return <Loading />;
  //Ner appen laddar data, visa Loader-komponenten direkt

  return (
    <section className="booklist" id="booklist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
          {/* Visar rubrik som beskriver sökresultatet, t.ex. "No Results" */}
        </div>

        <div className="booklist-content grid">
          {booksWithCovers.slice(0, 30).map(item => (
            <Book key={item.id} book={item} />
            // Renderar en Book-komponent för varje bok (max 30 böcker)
            // Skickar med boken som props
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;
