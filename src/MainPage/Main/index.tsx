import Search from '../Search';
import React from 'react';
import './style.css';

import CardsContainer from '../CardsContainer';
import { SearchWordInterface } from 'types/interfaces';

export default class Main extends React.Component<{}, SearchWordInterface> {
  constructor(props: {}) {
    super(props);
    this.state = { searchWord: '' };
  }

  componentDidMount() {
    const storagedInput = localStorage.getItem('eklp-storagedInput');
    if (storagedInput) this.setState({ searchWord: storagedInput });
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
    console.log('main rerender', this.state.searchWord);

    return (
      <div className='main__wrapper'>
        <Search actualSearchWord={searchWord} callback={this.handleSearchWord.bind(this)} />
        <CardsContainer searchWord={this.state.searchWord} />
      </div>
    );
  }
}
