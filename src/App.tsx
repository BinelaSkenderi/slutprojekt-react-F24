import './App.scss';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';

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
    children: [
      {
        path: '/book/:id',
        element: <BookDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
