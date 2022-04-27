import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicPlayerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  handleChange = ({ target: { checked } }) => {
    const { music, onChange } = this.props;
    this.setState({ loading: true });

    if (checked) {
      addSong(music).then(() => this.setState({ loading: false }));
    } else {
      removeSong(music).then(() => this.setState({ loading: false }));
    }
    this.fetchFavorites();
    onChange();
  };

  fetchFavorites = async () => {
    const fetchFavorites = await getFavoriteSongs();
    this.setState({ favorites: fetchFavorites });
  }

  render() {
    const { music: { previewUrl, trackName, trackId } } = this.props;
    const { loading, favorites } = this.state;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
          .
        </audio>
        {loading
          ? <span>Carregando...</span>
          : (
            <label htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                checked={ favorites.some((music) => music.trackId === trackId) }
                onChange={ this.handleChange }
              />
            </label>
          )}
      </div>
    );
  }
}

MusicPlayerCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
};

MusicPlayerCard.defaultProps = {
  onChange: () => {},
};
