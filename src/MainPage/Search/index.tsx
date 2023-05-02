import React, { FC, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import './style.css';
type SearchType = {
  callback: (word: string) => void;
};

const Search: FC<SearchType> = ({ callback }) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.current?.value) callback(searchRef.current?.value);
  };
  const resetSearch = () => {
    if (searchRef.current?.value) searchRef.current.value = '';
    callback('');
  };

  return (
    <form className="search__wrapper" onSubmit={(e) => handleSearch(e)}>
      <label htmlFor="search__input">
        <input
          ref={searchRef}
          type="text"
          role="searchbox"
          id="search__input"
          placeholder="Start search..."
          defaultValue={useSelector((state: RootState) => state.customDataReducer.searchWord)}
        />
        <input type="submit" className="search-btn" aria-label="searchBtn" value={''}></input>
      </label>
      {
        <button className="reset-btn" onClick={resetSearch}>
          RESET
        </button>
      }
    </form>
  );
};
export default Search;
