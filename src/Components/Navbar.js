import React from "react";
import Button from "react-bootstrap/Button";
import car from "./img/laptop.jpeg";

import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

export default class Navbar extends React.Component {
  constructor() {
      super();
      this.state = {loggedin:true}
    }
    
  handleLogout = () => {
    localStorage.clear();
    console.log('sd')
        this.setState({loggedin:false})
    }

  render() {
    if (!this.state.loggedin) {
      return <Redirect to="/sign-in" />;
    }
      const username = localStorage.getItem("username");
      
    return (
      <>
        <header>
          <div class="container">
            <nav>
              <div id="brand">
                <p>
                  <i class="fas fa-anchor"></i>
                  <span>Brand</span>
                </p>
              </div>
              <ul>
                <li>Hi, {username}</li>
                &nbsp; &nbsp; &nbsp;
                  <Button variant="dark" onClick={this.handleLogout} >Log Out</Button>
              </ul>
            </nav>
          </div>
        </header>
      </>
    );
  }
}
