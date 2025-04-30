import React from 'react';
import Header from '../../components/Header/Header';
import BookList from '../../components/BookList/BookList';

const Home = () => {
  return (
    <main>
      <Header />
      <BookList /> {/* Här är BookList alltid synlig */}
    </main>
  );
};

export default Home;
