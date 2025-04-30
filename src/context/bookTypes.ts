export type Book = {
  id: string;
  title: string;
  author: string;
  coverId: number | null;
  editionCount: number;
  firstPublishYear: number;
};

export type AppContextType = {
  loading: boolean;
  books: Book[];
  setSearchTerm: (term: string) => void;
  resultTitle: string;
  setResultTitle: (title: string) => void;
};
