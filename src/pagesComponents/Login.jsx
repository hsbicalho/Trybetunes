import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Login extends Component {
  render() {
    const {
      username,
      onLoginChange,
      buttonDisabled,
      buttonClick,
    } = this.props;
    return (
      <div data-testid="page-login">
        Login
        <form>
          <label htmlFor="login-name-input">
            Username:
            <input
              value={ username }
              type="text"
              data-testid="login-name-input"
              placeholder="name"
              onChange={ onLoginChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ buttonClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  username: propTypes.string,
  onLoginChange: propTypes.func,
  buttonDisabled: propTypes.bool,
  buttonClick: propTypes.func,
}.isRequired;
