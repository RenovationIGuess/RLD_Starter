import React, { useEffect, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import './SearchBar.scss';

const NoAnimateSearchBar = ({
  styles,
  // searchValue,
  // setSearchValue,
  id,
  placeholder,
}) => {
  const searchbarRef = useRef();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    document.removeEventListener('click', handleClickOutsideSearchBar, true);
    document.addEventListener('click', handleClickOutsideSearchBar, true);

    return () => {
      document.removeEventListener('click', handleClickOutsideSearchBar, true);
    };
  }, []);

  const handleClickOutsideSearchBar = () => {
    // const searchBar = document.querySelector(`#${id}`);
    const searchBar = searchbarRef.current;
    if (searchBar.classList.contains('search-bar--focused')) {
      searchBar.classList.remove('search-bar--focused');
    }
  };

  const handleClickClear = () => {
    setSearchValue('');
  };

  const handleSearchBarClicked = (event) => {
    event.currentTarget.classList.add('search-bar--focused');
  };

  return (
    <div
      id={id}
      ref={searchbarRef}
      className="search-bar"
      onClick={(e) => handleSearchBarClicked(e)}
    >
      <form>
        <div className={`search-bar__input`} style={styles}>
          <label className="autocomplete__label">
            <div className="relative p-0">
              <div className="autocomplete__wrp">
                <input
                  type="text"
                  autoComplete="off"
                  className="autocomplete__input"
                  placeholder={placeholder}
                  // id=''
                  // name=''
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {searchValue !== '' && (
                  <div
                    onClick={() => handleClickClear()}
                    role="button"
                    className="autocomplete__clear"
                  ></div>
                )}
              </div>
              {/* After user typed */}
              <div className="autocomplete__result"></div>
            </div>
          </label>
          <IoSearch className="icon-search" role="button" />
        </div>
      </form>
    </div>
  );
};

export default NoAnimateSearchBar;
