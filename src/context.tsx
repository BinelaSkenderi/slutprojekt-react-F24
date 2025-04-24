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

type bookSingle = {
  title: string;
  key: string;
  author_name: string[];
  cover_i: number;
  edition_count: number;
  first_publish_year: number;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('the lost world');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();
      const { docs } = data;
      console.log(docs);
      setBooks(docs);

      if (docs) {
        const newBooks = docs
          .slice(0, 20)
          .map(
            (bookSingle: {
              key: any;
              author_name: any;
              cover_i: any;
              edition_count: any;
              first_publish_year: any;
              title: any;
            }) => {
              const {
                key,
                author_name,
                cover_i,
                edition_count,
                first_publish_year,
                title,
              } = bookSingle;

              return {
                id: key,
                author: author_name?.join(', '),
                coverId: cover_i,
                editionCount: edition_count,
                firstPublishYear: first_publish_year,
                title: title,
              };
            }
          );

        setBooks(newBooks); // om du använder useState
        if (newBooks.length > 1) {
          setResultTitle('Your Search Result');
        } else {
          setResultTitle('No Search Result Found!');
        }
      } else {
        setBooks([]);
        setResultTitle('No Search Result Found!');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
