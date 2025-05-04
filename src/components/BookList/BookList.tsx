import React from 'react';
import { useGlobalContext } from '../../context/BookContext';
// Hämtar global state (t.ex. böcker och laddningsstatus) från din context
import Book from './Book';
import Loading from '../Loader/Loader';
// Importerar laddningskomponenten som visas när data hämtas
import coverImg from '../../images/covernotfound.png';
// Importerar en standardbild som visas om boken saknar omslagsbild
import './BookList.scss';

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();
  // Hämtar böcker, laddningsstatus och resultattext från global context

  const booksWithCovers = books.map(singlebook => ({
    ...singlebook,
    // Kopierar all data från boken

    id: singlebook.id.replace('/works/', ''),
    // Tar bort "/works/" från ID:t för att göra det enklare att använda (t.ex. i URL)

    cover_img: singlebook.coverId
      ? `https://covers.openlibrary.org/b/id/${singlebook.coverId}-L.jpg`
      : coverImg,
    // Om boken har en omslags-ID, skapas URL till omslagsbilden.
    // Om inte, används en standardbild (coverImg)
  }));
  // Skapar en ny array med omslagsbilder och rensade ID:n

  if (loading) return <Loading />;
  // Om appen laddar data, visa Loader-komponenten direkt

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
