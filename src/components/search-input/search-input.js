import React, { useState } from 'react';
import './search-input.css';

const SearchInput = ({ inputValue, setInputValue }) => {
  const [value, setValue] = useState(inputValue);

  const handleChange = (e) => {
    setInputValue(e.target.value)
    setValue(e.target.value);
    localStorage.setItem('search-value', e.target.value);
  };

  return (
    <div className="search-input">
      <input
        value={value}
        type="text"
        onChange={handleChange}
        placeholder="Поле для поиска"
      />
    </div>
  );
};

export default SearchInput;
