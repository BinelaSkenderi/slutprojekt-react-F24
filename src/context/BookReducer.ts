import { Book } from './bookTypes';

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'SET_TITLE'; payload: string };

type State = {
  loading: boolean;
  books: Book[];
  resultTitle: string;
};

export const initialState: State = {
  loading: true,
  books: [],
  resultTitle: '',
};

export const bookReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'SET_TITLE':
      return { ...state, resultTitle: action.payload };
    default:
      return state;
  }
};
