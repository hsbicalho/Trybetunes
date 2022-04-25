import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicPlayerCard from '../components/MusicPlayerCard';

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayMusics: [],
      requestEnded: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((musicData) => {
      this.setState({ arrayMusics: musicData, requestEnded: true });
    });
  }

  render() {
    const { arrayMusics, requestEnded } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {requestEnded
          && (
            <div>
              <p data-testid="artist-name">{ arrayMusics[0].artistName }</p>
              <p data-testid="album-name">{ arrayMusics[0].collectionName }</p>
              <img src={ arrayMusics[0].artworkUrl100 } alt="album" />
            </div>
          )}
        {requestEnded
          && arrayMusics.slice(1).map((music, musicNumber) => (
            <MusicPlayerCard music={ music } key={ musicNumber } />
          ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
