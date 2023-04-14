import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchWordRdc } from '../../store/dataSlice';
import { RootState } from '../../store';

import './style.css';

const Search = () => {
  const word = useSelector((state: RootState) => state.customDataReducer.searchWord);
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState(word);

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };
  const handleSearch = () => {
    dispatch(addSearchWordRdc({ word: searchWord }));
  };
  const resetSearch = () => {
    setSearchWord('');
    dispatch(addSearchWordRdc({ word: '' }));
  };

  return (
    <div className="search__wrapper">
      <label htmlFor="search__input">
        <input
          type="text"
          role="searchbox"
          id="search__input"
          placeholder="Start search..."
          value={searchWord}
          onChange={onChangeHandle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button className={'search-btn'} aria-label={'searchBtn'} onClick={handleSearch}></button>
      </label>
      <button className="reset-btn" onClick={resetSearch}>
        RESET
      </button>
    </div>
  );
};
export default Search;
