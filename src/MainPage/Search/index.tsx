import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { SearchProps } from 'types/interfaces';
import './style.css';

const Search: FC<SearchProps> = ({ callback }: SearchProps) => {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('eklp-storagedInput') || '');
  const wordRef = useRef<string>(searchWord || '');
  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
    wordRef.current = event.target.value;
  };
  const handleSearch = () => {
    callback(wordRef.current);
    localStorage.setItem('eklp-storagedInput', wordRef.current);
  };
  const resetSearch = () => {
    setSearchWord('');
    callback('');
    wordRef.current = '';
    localStorage.setItem('eklp-storagedInput', '');
  };

  useEffect(() => {}, []);
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
