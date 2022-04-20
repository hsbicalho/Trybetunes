import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: false,
      loading: false,
      name: '',
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value });
  }

  signIn = () => {
    const { name } = this.state;
    this.setState({ loading: true });
    createUser({ name })
      .then(() => this.setState({ userLogged: true, loading: false }));
  }

  render() {
    const { name, userLogged, loading } = this.state;
    const minValueSize = 3;
    if (userLogged) {
      return (
        <Redirect to="/search" />
      );
    }
    return (
      <div data-testid="page-login">
        {loading
          ? <span>Carregando...</span>
          : (
            <div>
              Login
              <input
                value={ name }
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
              <button
                disabled={ name.length < minValueSize }
                type="submit"
                data-testid="login-submit-button"
                onClick={ this.signIn }
              >
                Entrar
              </button>
            </div>
          )}
      </div>
    );
  }
}

export default Login;
