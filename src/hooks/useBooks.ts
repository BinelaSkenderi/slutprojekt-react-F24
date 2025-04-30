import { useState, useEffect, useCallback } from 'react';
import { Book } from '../context/bookTypes';

// Grund-URL till Open Library API där vi söker på boktitlar
const URL = 'https://openlibrary.org/search.json?title=';

// Skapar en custom hook som tar in en sökterm
export const useBooks = (searchTerm: string) => {
  // books: sparar listan med böcker
  const [books, setBooks] = useState<Book[]>([]);

  // loading: håller reda på om API-anropet pågår
  const [loading, setLoading] = useState<boolean>(false);

  // resultTitle: text som visas beroende på resultatet (t.ex. "No results found")
  const [resultTitle, setResultTitle] = useState<string>('');

  // Funktion som hämtar böcker från API:t — memoiserad med useCallback för att undvika onödiga upprepningar
  const fetchBooks = useCallback(async () => {
    // Startar laddningsindikatorn
    setLoading(true);

    try {
      // Gör ett anrop till API:t med söktermen
      const response = await fetch(`${URL}${searchTerm}`);

      // Omvandlar svaret till JSON
      const data = await response.json();

      // Hämtar ut 'docs' som innehåller träffarna
      const { docs } = data;

      // Om det finns träffar
      if (docs) {
        // Tar de första 20 träffarna och bearbetar dem till Book-objekt
        const newBooks = docs.slice(0, 20).map((bookSingle: any) => {
          // Extraherar relevanta fält från varje bok
          const {
            key, // unikt ID för boken
            author_name = [], // lista på författare
            cover_i = null, // ID för bokomslaget
            edition_count, // antal utgåvor
            first_publish_year, // första publiceringsåret
            title, // titel
          } = bookSingle;

          // Returnerar ett anpassat objekt enligt Book-typen
          return {
            id: key,
            author: author_name.join(', '), // Slår ihop författarnamn till en sträng
            coverId: cover_i,
            editionCount: edition_count,
            firstPublishYear: first_publish_year,
            title,
          };
        });

        // Sparar böckerna i state
        setBooks(newBooks);

        // Sätter text baserat på antal träffar
        setResultTitle(
          newBooks.length === 1
            ? `1 Result Found: ${newBooks[0].title}`
            : newBooks.length > 1
            ? 'Your Search Results'
            : 'No Search Results Found'
        );
      } else {
        // Om inga träffar finns
        setBooks([]);
        setResultTitle('No Search Results Found');
      }
    } catch (error) {
      // Fångar fel om något går fel i API-anropet
      console.log('Error fetching books:', error);
      setBooks([]);
      setResultTitle('Error Fetching Results');
    } finally {
      // Stänger av laddningsindikatorn oavsett vad som händer
      setLoading(false);
    }
  }, [searchTerm]); // Kör om söktermen ändras

  // useEffect körs varje gång söktermen ändras → hämtar nya böcker
  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  // Returnerar allt som komponenten behöver: böcker, laddning, resultattext, och sättare
  return { books, loading, resultTitle, setBooks, setResultTitle };
};
