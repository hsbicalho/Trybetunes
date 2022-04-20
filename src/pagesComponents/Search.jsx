import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchComplete: false,
      loading: false,
      artist: '',
      name: '',
      albums: [],
    };
  }

  seachAlbums = () => {
    const { artist } = this.state;
    this.setState({ loading: true, name: '' });
    searchAlbumsAPI(artist)
      .then((data) => {
        this.setState({
          loading: false,
          searchComplete: true,
          albums: data,
        });
      });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value, artist: value });
  }

  render() {
    const { name, searchComplete, loading, albums, artist } = this.state;
    const MIN_VALUE = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            value={ name }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            disabled={ name.length < MIN_VALUE }
            type="button"
            data-testid="search-artist-button"
            onClick={ this.seachAlbums }
          >
            Pesquisar
          </button>
        </form>
        {searchComplete
          ? (
            <div>
              <p>
                Resultado de álbuns de:
                {' '}
                {artist}
              </p>
              {albums.length === 0
                ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <ul>
                    {albums.map(({ collectionId, collectionName }, index) => (
                      <li key={ collectionId }>
                        <Link
                          data-testid={ `link-to-album-${collectionId}` }
                          to={ `/album/${collectionId}` }
                        >
                          <img
                            src={ albums[index].artworkUrl100 }
                            alt={ collectionName }
                          />
                          {collectionName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          )
          : (
            <div>{loading ? <span>Carregando...</span> : ''}</div>
          )}
      </div>
    );
  }
}
