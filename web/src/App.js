import Header from './Header.js';
import Login from './Login.js';
import Home from './Home.js';
import Users from './Users.js';
import User from './User.js';
import {auth_post} from './api.js';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        username: '',
        is_authenticated: false,
        redirect: false
      }
    };

  componentDidMount() {
    this.authenticate()
  }

  authenticate() {    
    auth_post('/authenticate').then(data => 
      this.setState({
        is_authenticated: (data.is_authenticated === 'true'),
        username: data.f_name,
        redirect: !(data.is_authenticated === 'true')
      }))
  }

  render() {
    return (
      <Router>
        {this.state.redirect ? <Redirect to="/login"/> : ''}
        {this.state.is_authenticated ? <Header username={this.state.username} /> : ''}
        <Switch>
          <Route path='/login'>
            <Login 
              authenticate={() => this.authenticate()}
            />
          </Route>
          {this.state.is_authenticated && (<Route path='/users'><Users /></Route>)}
          {this.state.is_authenticated && (<Route path='/user'><User /></Route>)}
          {this.state.is_authenticated && (<Route path='/'><Home /></Route>)}
        </Switch>
      </Router>
    );
  }
}

export default App;
