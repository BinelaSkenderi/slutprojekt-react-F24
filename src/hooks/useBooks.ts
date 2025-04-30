import { useState, useEffect, useCallback } from 'react';
import { Book } from '../context/bookTypes';

const URL = 'https://openlibrary.org/search.json?title=';

export const useBooks = (searchTerm: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultTitle, setResultTitle] = useState<string>('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();
      const { docs } = data;

      if (docs) {
        const newBooks = docs.slice(0, 20).map((bookSingle: any) => {
          const {
            key,
            author_name = [],
            cover_i = null,
            edition_count,
            first_publish_year,
            title,
          } = bookSingle;

          return {
            id: key,
            author: author_name.join(', '),
            coverId: cover_i,
            editionCount: edition_count,
            firstPublishYear: first_publish_year,
            title,
          };
        });

        setBooks(newBooks);
        setResultTitle(
          newBooks.length === 1
            ? `1 Result Found: ${newBooks[0].title}`
            : newBooks.length > 1
            ? 'Your Search Results'
            : 'No Search Results Found'
        );
      } else {
        setBooks([]);
        setResultTitle('No Search Results Found');
      }
    } catch (error) {
      console.log('Error fetching books:', error);
      setBooks([]);
      setResultTitle('Error Fetching Results');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return { books, loading, resultTitle, setBooks, setResultTitle };
};
