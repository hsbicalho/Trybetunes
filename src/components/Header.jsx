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
            <p data-testid="header-user-name">{username}</p>
          </header>
        )
    );
  }
}
