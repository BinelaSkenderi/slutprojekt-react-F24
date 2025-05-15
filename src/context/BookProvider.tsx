import React, { ReactNode, useState } from 'react';
import { AppContextType } from './bookTypes';
import { BookContext } from './BookContext';
import { useBooks } from '../hooks/useBooks'; // Importera hooken

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('the lost world');

  // hooken för att hämta böcker
  const { books, loading, resultTitle, setResultTitle } = useBooks(searchTerm);

  //skapar värdet
  const value: AppContextType = {
    loading,
    books,
    setSearchTerm,
    resultTitle,
    setResultTitle,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
