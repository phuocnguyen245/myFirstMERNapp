import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchFetch } from '../homePageSlice';
import SearchBar from './SearchBar';

const SearchContainer = () => {
  const typingTimeoutRef: any = useRef(null);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      e.target.value === ''
        ? dispatch(getSearchFetch(null))
        : dispatch(getSearchFetch(e.target.value));
    }, 500);
  };

  return (
    <div className="left__search p-0">
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Tìm địa điểm, món ăn, địa chỉ"
      />
      <a href="/#">
        <button className="btn">
          <i className="fa fa-search text-white" />
        </button>
      </a>
      <SearchBar />
    </div>
  );
};

export default SearchContainer;
