import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    };

    getTime() {
      return fetch('/time').then(res => res.json()).then(data => {
        this.setState({
          currentTime: data.time
        })
      });
    }
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Home
            </p>
            <button onClick={() => this.getTime()}>TRY ME</button>
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
  
  export default Home;