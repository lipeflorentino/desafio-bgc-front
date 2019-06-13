import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./app.scss";
import Routes from "./routes";
//local storage
var localStorage = require('localStorage');

class App extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }
  
  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  
  handleLogout = async event => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);
    localStorage.clear();
    this.props.history.push("/login");
  }
  
  render() {
    
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    
    return (
      !this.state.isAuthenticating &&
      <div className="app-container">
        <button type="submit" onClick={this.handleLogout} className="btn-logout">Logout</button>
        <Routes childProps={childProps} />
      </div>
      
    );
  }
}

export default withRouter(App);