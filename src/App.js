import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pagesComponents/Login';
import Favorites from './pagesComponents/Favorites';
import Album from './pagesComponents/Album';
import Profile from './pagesComponents/Profile';
import ProfileEdit from './pagesComponents/ProfileEdit';
import Search from './pagesComponents/Search';
import NotFound from './pagesComponents/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loginButtonDisabled: true,
      logged: false,
      loading: true,
      searchButtonDisabled: true,
      artist: '',
    };
    this.onLoginChange = this.onLoginChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onLoginChange = ({ target: { value } }) => {
    const MIN_CHARCTERS = 3;
    if (value.length >= MIN_CHARCTERS) {
      this.setState({
        loginButtonDisabled: false,
        username: value,
      });
    } else {
      this.setState({
        loginButtonDisabled: true,
        username: value,
      });
    }
  }

  onSearchChange = ({ target: { value } }) => {
    const MIN_CHARCTERS = 2;
    if (value.length >= MIN_CHARCTERS) {
      this.setState({
        searchButtonDisabled: false,
        artist: value,
      });
    } else {
      this.setState({
        searchButtonDisabled: true,
        artist: value,
      });
    }
  }

  async onButtonClick() {
    this.setState({
      logged: true,
      loading: false,
    });
    const { username } = this.state;
    await createUser({ name: username });
    this.setState({
      loading: true,
    });
  }

  render() {
    const {
      username,
      loginButtonDisabled,
      logged,
      loading,
      searchButtonDisabled,
      artist,
    } = this.state;

    return (
      <div>
        <main>
          <Switch>
            <Route exact path="/">
              {logged
                ? <Redirect to="/search" />
                : (
                  <Login
                    username={ username }
                    buttonDisabled={ loginButtonDisabled }
                    onLoginChange={ this.onLoginChange }
                    buttonClick={ this.onButtonClick }
                  />
                )}
            </Route>

            <Route exact path="/search">
              {loading
                ? (
                  <Search
                    buttonDisabled={ searchButtonDisabled }
                    artistToBeSearched={ artist }
                    onInputChange={ this.onSearchChange }
                  />
                )
                : <span>Carregando...</span>}
            </Route>
            <Route exact path="/album/:id" render={ () => <Album /> } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="*" component={ NotFound } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
