import React from "react";
import Button from "react-bootstrap/Button";
import { MdSchool } from "react-icons/md";
import {FiLogOut} from "react-icons/fi"



import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

export default class Navbar extends React.Component {
  constructor() {
      super();
    this.state = { loggedin: true }
    String.prototype.unquoted = function (){return this.replace (/(^")|("$)/g, '')}

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
    const username = localStorage.getItem("username").unquoted();
 
      
    return (
      <>
        <header>
          <div class="container">
            <nav>
              <div id="brand">
                <p>              
                 <a href="/user"> <span>      <MdSchool />
TestMaker</span></a>
                </p>
              </div>
              <ul>
                <li>Hi, {username}</li>
                &nbsp; &nbsp; &nbsp;
                  <button class="btn-hover color-11" style={{  height:" 35px",width:"120px"
}}  onClick={this.handleLogout} >
    <FiLogOut/> Log Out</button>
              </ul>
            </nav>
          </div>
        </header>
      </>
    );
  }
}
