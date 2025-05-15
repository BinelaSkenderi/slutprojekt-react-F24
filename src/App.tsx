import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BookProvider } from './context/BookProvider';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import AuthorPage from './pages/AuthorPage/AuthorPage';
import LanguagePage from './pages/LanguagePage/LanguagePage';
import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/about',
    element: <About />,
  },

  {
    path: '/book',
    element: <BookList />,
    children: [],
  },

  {
    path: '/book/:id',
    element: <BookDetails />,
  },

  {
    path: '/categories',
    element: <CategoryPage />,
  },

  {
    path: '/authors',
    element: <AuthorPage />,
  },

  {
    path: '/languages',
    element: <LanguagePage />,
  },
]);

function App() {
  return (
    <BookProvider>
      <RouterProvider router={router} />
    </BookProvider>
  );
}

export default App;
