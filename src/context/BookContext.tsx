import { createContext, useContext } from 'react';
import { AppContextType } from './bookTypes';

export const BookContext = createContext<AppContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a BookProvider');
  }
  return context;
};
