import logo from './logo.svg';
import './App.css';
import {auth_post} from './api.js'
import React, { Component } from 'react';

class Users extends Component {
    constructor(props) {
      super(props)
        this.state = {}
      };

    componentDidMount() {
      this.get_users()
    }

    get_users() {
      return auth_post('/get_users').then(data => console.log(data))
    }
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Users
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
  }
  
  export default Users;