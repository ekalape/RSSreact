import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { SearchProps } from 'types/interfaces';
import './style.css';

const Search: FC<SearchProps> = ({ callback }: SearchProps) => {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('eklp-storagedInput') || '');
  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };
  const handleSearch = () => {
    callback(searchWord);
  };
  const resetSearch = () => {
    setSearchWord('');
    callback('');
  };

  useEffect(() => {
    return () => localStorage.setItem('eklp-storagedInput', searchWord);
  }, [searchWord]);
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
