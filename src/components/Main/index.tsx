import Search from '../Search';
import React from 'react';
import SaveInfo from '../SaveInfo';

import CardsContainer from '../CardsContainer';

export default class Main extends React.Component {
  render(): React.ReactNode {
    return (
      <div className='main__wrapper'>
        <Search />
        <CardsContainer searchWord='' />
      </div>
    );
  }
}
