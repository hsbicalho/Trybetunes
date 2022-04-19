import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ username: user.name, loading: false });
  }

  render() {
    const { username, loading } = this.state;
    return (
      loading
        ? <span>Carregando...</span>
        : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">{`Logged: ${username}`}</p>
            <div>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            </div>
          </header>
        )
    );
  }
}
