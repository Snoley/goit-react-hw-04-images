import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import {
  SearchbarHead,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.Styled';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '100px',
  timeout: 1500,
  fontSize: '20px',
});

export function Searchbar({ query }) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.currentTarget.value.trimLeft());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input === '') {
      Notiflix.Notify.warning('You made the same request');
      return;
    }else {
      query(input);
    }
    setInput('');
  };

  return (
    <SearchbarHead>
      <SearchForm onSubmit={handleSubmit} className="SearchForm">
        <SearchFormBtn type="submit">
          <FaSearch style={{ height: '30px', width: '30px' }} />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHead>
  );
}

Searchbar.propTypes = {
  query: PropTypes.func.isRequired,
};

