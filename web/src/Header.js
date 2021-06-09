import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const styles = {
    display: 'flex', justifyContent: 'space-between'
}

const button = {
    width: '200px', height: '50px', backgroundColor: 'transparent', border: 'none'
}

const select = {
    width: '200px', height: '50px', backgroundColor: 'lightblue', border: 'none'
}

class Header extends Component {
    constructor(props) {
      super(props)
        this.state = {
            home: true
        }
      };

    setHome() {
        this.setState({
            home: true,
            users: false,
            user: false
        })
    }

    setUsers() {
        this.setState({
            home: false,
            users: true,
            user: false
        })
    }

    setUser() {
        this.setState({
            home: false,
            users: false,
            user: true
        })
    }
  
    render() {
      return (
        <div style={styles}>
          <Link to='/home'><button style={button} onClick={() => this.setHome()}><span role="img" aria-label="eyes">👀</span></button></Link>
          <div style={{width:'75%'}}></div>
          <Link to='/home'><button style={this.state.home ? select : button} onClick={() => this.setHome()}>Home</button></Link>
          <Link to='/users'><button style={this.state.users ? select : button} onClick={() => this.setUsers()}>Users</button></Link>
          <Link to='/user'><button style={this.state.user ? select : button} onClick={() => this.setUser()}>{this.props.username}</button></Link>
        </div>
      );
    }
  }
  
  export default Header;