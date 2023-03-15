import Search from '../Search';
import React from 'react';
import './style.css';

import CardsContainer from '../CardsContainer';
import { EmptyProps, SearchWordInterface } from 'types/interfaces';

export default class Main extends React.Component<EmptyProps, SearchWordInterface> {
  constructor(props: EmptyProps) {
    super(props);
    this.state = { searchWord: '' };
  }

  handleSearchWord(word: string) {
    this.setState({ searchWord: word });
  }

  render(): React.ReactNode {
    return (
      <div className="main__wrapper" role={'main-page'}>
        <Search callback={this.handleSearchWord.bind(this)} />
        <CardsContainer searchWord={this.state.searchWord} />
      </div>
    );
  }
}
