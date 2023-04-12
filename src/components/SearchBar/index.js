import React from 'react';

const SearchBar = ({
    searchlabel = '',
    searchValue = '',
    placeholder = 'Search',
    onTextChange = (val) => {},
    onSearch = () => {},
}) => {
    return (
        <div>
            <label className='search-label' >{searchlabel}</label>
            <input className='search-input' type={'number'} value={searchValue} placeholder={placeholder} onChange={(e) => onTextChange(e.target.value)} />
            <button className='search-button' type={'button'} disabled={!searchValue} onClick={onSearch}>Search</button>
        </div>
    )
};

export default SearchBar;