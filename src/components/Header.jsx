import React, { Component } from 'react';
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
    this.setState({ username: await getUser().name, loading: false });
  }

  render() {
    const { username, loading } = this.state;
    return (
      loading
        ? <span>Carregando...</span>
        : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">{username}</p>
          </header>
        )
    );
  }
}
