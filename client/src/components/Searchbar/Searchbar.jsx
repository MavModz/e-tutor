import React from 'react';
import { Search } from 'lucide-react';
import './searchbar.css';

function Searchbar({ inputValue, onInputChange, fetchData, id, name, label, placeholder, onBlur, onFocus }) {

  const handleInputChange = (value) => {
    onInputChange(value);
    fetchData(value);
  };

  return (
    <div className="search-input-wrapper">
      <Search color="#737784" strokeWidth={1.5} id='search-icon' />
      <label htmlFor={id}>{label}</label>
      <input placeholder= {placeholder}
        id={id}
        name={name}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  )
}

export default Searchbar