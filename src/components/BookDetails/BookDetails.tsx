import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// useParams används för att hämta ID från URL:en
// useNavigate används för navigering (används ej här men är redo)
import Loading from '../Loader/Loader';
import coverImg from '../../images/covernotfound.png';
import './BookDetails.scss';

const URL = 'https://openlibrary.org/works/';
// Bas-URL för att hämta detaljerad bokdata från Open Library API

interface BookDetailsType {
  title: string;
  description: string;
  cover_img: string;
  subject_places: string;
  subject_times: string;
  subjects: string;
}

const BookDetails = () => {
  const { id } = useParams();
  // Hämtar ID från URL:en (via /book/:id)

  const [loading, setLoading] = useState(false);
  // State för att visa om data laddas

  const [book, setBook] = useState<BookDetailsType | null>(null);
  // State för att lagra hämtad bokdata

  console.log(id);

  useEffect(() => {
    const getBookDetails = async () => {
      setLoading(true);
      // Sätter loading till true innan hämtning

      try {
        const response = await fetch(`${URL}${id}.json`);
        // Hämtar bokdata baserat på ID

        const data = await response.json();
        // Omvandlar response till JSON

        if (data) {
          // Om data finns, extrahera relevanta fält

          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;

          const newBook: BookDetailsType = {
            title,
            // Titel från API

            description:
              typeof description === 'string'
                ? description
                : description?.value || 'No description found',
            // Om beskrivning är en sträng, använd den.
            // Om det är ett objekt, använd dess `value`. Annars visa standardtext

            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            // Om boken har ett omslags-ID, skapa URL till bilden. Annars visa defaultbild

            subject_places: subject_places
              ? subject_places.join(', ')
              : 'No subject places found',
            // Om platser finns, slå ihop dem till en sträng. Annars visa standardtext

            subject_times: subject_times
              ? subject_times.join(', ')
              : 'No subject times found',
            // för tidsperioder

            subjects: subjects ? subjects.join(', ') : 'No subjects found',
            // för ämnen
          };

          setBook(newBook);
          // Sparar ny bokinfo i state
        } else {
          setBook(null);
          // Om ingen data hittas, sätt book till null
        }
      } catch (error) {
        console.log(error);
        setBook(null);
        // Vid fel logga det och töm bok-datan
      }
      setLoading(false);
      // Slutar ladda oavsett resultat
    };

    getBookDetails();
    // Kör funktionen direkt när komponenten mountas eller id ändras
  }, [id]);

  if (loading) return <Loading />;
  // Loader medan data hämtas

  return (
    <section className="book-details">
      <div className="container">
        <div className="back-link">
          <Link to="/">← Back to Home</Link>
        </div>

        {book && (
          // Visar innehållet endast om `book` finns

          <div className="book-details-content grid">
            <div className="book-details-img">
              <img src={book.cover_img} alt="cover" />
              {/* bokomslaget */}
            </div>

            <div className="book-details">
              <div className="book-details-item title">
                <span className="fw-6 fs-24">{book.title}</span>
                {/* Bokens titel med större text */}
              </div>

              <div className="book-details-item description">
                <span>{book.description}</span>
                {/* Bokens beskrivning */}
              </div>

              <div className="book-details-item">
                <span className="fw-6">Subject Places: </span>
                <span className="text-italic">{book.subject_places}</span>
                {/* Ämnesplatser */}
              </div>

              <div className="book-details-item">
                <span className="fw-6">Subject Times: </span>
                <span className="text-italic">{book.subject_times}</span>
                {/* Ämnestider */}
              </div>

              <div className="book-details-item">
                <span className="fw-6">Subjects: </span>
                <span>{book.subjects}</span>
                {/* Ämnen */}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookDetails;
