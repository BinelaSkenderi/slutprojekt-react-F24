import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

const URL = 'https://openlibrary.org/search.json?title=';

type AppContextType = {
  loading: boolean;
  books: any[];
  setSearchTerm: (term: string) => void;
  resultTitle: string;
  setResultTitle: (title: string) => void;
};

type Book = {
  id: string;
  title: string;
  author: string;
  coverId: number | null;
  editionCount: number;
  firstPublishYear: number;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('the lost world');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();
      const { docs } = data;

      if (docs) {
        const newBooks = docs
          .slice(0, 20) // Limit to 20 books for performance
          .map(
            (bookSingle: {
              key: string;
              author_name: string[];
              cover_i: number;
              edition_count: number;
              first_publish_year: number;
              title: string;
            }) => {
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
                author: author_name.join(', '), // Ensure author is a string, joining if it's an array
                coverId: cover_i, // Can be null if not available
                editionCount: edition_count,
                firstPublishYear: first_publish_year,
                title: title,
              };
            }
          );

        setBooks(newBooks);

        if (newBooks.length > 1) {
          setResultTitle('Your Search Results');
        } else if (newBooks.length === 1) {
          setResultTitle(`1 Result Found: ${newBooks[0].title}`);
        } else {
          setResultTitle('No Search Results Found');
        }
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

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext, AppProvider };
