import Search from '../Search';
import React, { useState } from 'react';
import './style.css';

import CardsContainer from '../CardsContainer';

const Main = () => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearchWord = (word: string) => {
    setSearchWord(word);
  };

  return (
    <div className="main__wrapper" role={'main-page'}>
      <Search callback={handleSearchWord} />
      <CardsContainer searchWord={searchWord} />
    </div>
  );
};
export default Main;
