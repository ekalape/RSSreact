import React, { ChangeEvent } from 'react';
import { SearchProps, SearchWordInterface } from 'types/interfaces';
import './style.css';

export default class Search extends React.Component<SearchProps, SearchWordInterface> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchWord: this.props.actualSearchWord };
  }
  componentDidMount(): void {
    this.setState({ searchWord: this.props.actualSearchWord });
  }

  onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchWord: event.target.value });
  };
  handleSearch = () => {
    this.props.callback(this.state.searchWord);
  };
  resetSearch = () => {
    this.setState({ searchWord: '' });
    this.props.callback('');
  };

  render(): React.ReactNode {
    return (
      <div className='search__wrapper'>
        <label htmlFor='search__input'>
          <input
            type='text'
            role='searchbox'
            id='search__input'
            placeholder='Start search...'
            value={this.state.searchWord}
            onChange={this.onChangeHandle}
            onKeyDown={(e) => {
              if (e.key === 'Enter') this.handleSearch();
            }}
          />
          <button className={'search-btn'} onClick={this.handleSearch}></button>
        </label>
        <button className='reset-btn' onClick={this.resetSearch}>
          RESET
        </button>
      </div>
    );
  }
}
