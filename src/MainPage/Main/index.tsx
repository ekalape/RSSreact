import Search from '../Search';
import React from 'react';
import './style.css';

import CardsContainer from '../CardsContainer';
import { SearchWordInterface } from 'types/interfaces';

export default class Main extends React.Component<{}, SearchWordInterface> {
  constructor(props: {}) {
    super(props);
    const storagedInput = localStorage.getItem('eklp-storagedInput');
    this.state = { searchWord: storagedInput || '' };
  }

  componentWillUnmount(): void {
    const { searchWord } = this.state;
    localStorage.setItem('eklp-storagedInput', searchWord);
  }

  handleSearchWord(word: string) {
    this.setState({ searchWord: word });
  }

  render(): React.ReactNode {
    const searchWord = this.state.searchWord;
    return (
      <div className='main__wrapper'>
        <Search actualSearchWord={searchWord} callback={this.handleSearchWord.bind(this)} />
        <CardsContainer searchWord={this.state.searchWord} />
      </div>
    );
  }
}
