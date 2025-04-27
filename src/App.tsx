import './App.scss';
import { createBrowserRouter, Routes, RouterProvider } from 'react-router-dom';
import { AppProvider } from './context';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // Startväg
  },
  {
    path: '/about',
    element: <About />, // Om-sida
  },
  {
    path: '/book',
    element: <BookList />, // Boklistan
    children: [
      {
        path: '/book:id',
        element: <BookDetails />, // En specifik bok (dynamisk id)
      },
    ],
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
