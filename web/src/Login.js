import './App.css';
import {post, set_token} from './api.js';
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'


class Login extends Component {
    constructor(props) {
      super(props)
        this.state = {
          username: '',
          password: '',
          code_2fa: '',
          first_login: true,
          second_login: false
        }
      };

    attempt_login() {
      return post('/attempt_login', this.state).then(data => 
        this.setState({
          first_login: data.success === 'true' ? false : true,
          second_login: data.success === 'true' ? true : false,
        }))
    }

    attempt_2fa() {
      post('/attempt_2fa', this.state).then(data => 
        set_token(data)).then(() => this.props.authenticate())
      return this.props.history.push('/')
    }
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <span role="img" aria-label="eyes">👀</span>
            {this.state.first_login && (
              <div style={{width:'800px'}}>
                <div style={{width:'800px'}}>
                  <div style={{width:'400px', display:'inline-block'}}>
                    email
                  </div>
                  <div style={{width:'400px', display:'inline-block'}}>
                    <input onChange={e => this.setState({ username: e.target.value })}></input>
                  </div>
                </div>
                <div style={{width:'800px'}}>
                  <div style={{width:'400px', display:'inline-block'}}>
                    password
                  </div>
                  <div style={{width:'400px', display:'inline-block'}}>
                    <input type='password' onChange={e => this.setState({ password: e.target.value })}></input>
                  </div>
                  <div style={{width:'800px'}}>
                  <div style={{width:'400px', display:'inline-block'}}>
                    <button>forgot?</button>
                  </div>
                  <div style={{width:'400px', display:'inline-block'}}>
                    <button onClick={() => this.attempt_login()}>submit</button>
                  </div>
                </div>
              </div>
            </div>
            )}
            {this.state.second_login && (
              <div style={{width:'800px'}}>
                <div style={{width:'800px'}}>
                  <div style={{width:'400px', display:'inline-block'}}>
                    2fa
                  </div>
                  <div style={{width:'400px', display:'inline-block'}}>
                    <input onChange={e => this.setState({ code_2fa: e.target.value })}></input>
                  </div>
                </div>
                <div style={{width:'800px'}}>
                  <div style={{width:'800px', display:'inline-block'}}>
                    <button onClick={() => this.attempt_2fa()}>login</button>
                  </div>
              </div>
            </div>
            )}
          </header>
        </div>
      );
    }
  }
  
  export default withRouter(Login);