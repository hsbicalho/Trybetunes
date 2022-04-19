import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    const {
      artistToBeSearched,
      onInputChange,
      buttonDisabled,
      buttonClick,
    } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            value={ artistToBeSearched }
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            onClick={ buttonClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
Search.propTypes = {
  artistToBeSearched: propTypes.string,
  onInputChange: propTypes.func,
  buttonDisabled: propTypes.bool,
  buttonClick: propTypes.func,
}.isRequired;
