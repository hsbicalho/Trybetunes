import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pagesComponents/Login';
import Favorites from './pagesComponents/Favorites';
import Album from './pagesComponents/Album';
import Profile from './pagesComponents/Profile';
import ProfileEdit from './pagesComponents/ProfileEdit';
import Search from './pagesComponents/Search';
import NotFound from './pagesComponents/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
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
