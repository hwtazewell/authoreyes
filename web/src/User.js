import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import QRCode from 'react-google-qrcode';

class User extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      };
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              User
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
  
  export default User;