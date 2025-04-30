import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Importerar React Router-funktioner: för att skapa och använda routes
import { BookProvider } from './context/BookProvider';
// Importerar provider som ger global tillgång till bok-data via context
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
      {/* Omsluter hela appen med en provider som ger tillgång till global bokdata */}

      <RouterProvider router={router} />
      {/* Använder router-konfigurationen ovan för att visa rätt komponent beroende på URL */}
    </BookProvider>
  );
}

export default App;
