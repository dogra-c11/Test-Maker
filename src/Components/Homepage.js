import React from "react";
import Button from "react-bootstrap/Button";
import car from './img/laptop.jpeg'

import {
    BrowserRouter as Router,
  Link,
    Redirect,
    
  } from "react-router-dom";

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedin:false,
    }
    
    }

  componentWillMount() {
    const user = localStorage.getItem("user");
    if (user) {
      console.log(user)
      this.setState({loggedin:true})
    }
    }

render() {
  if (!this.state.loggedin) {
    return (
      <Redirect to="/sign-in"/>
    );
    }
    return (
        <>
          <div className="hp"><h1>TEST MAKER</h1>
            <Link to="/create_form"  className="btn btn-primary link">Create Form</Link>
            <Link to="/fill_response"  className="btn btn-primary link">Fill Response</Link>
          <Link to="/show_responses" className="btn btn-primary link">Responses</Link></div>
          
      </>
    );
  }
}

