import React from "react";
import Button from "react-bootstrap/Button";
import car from "./img/laptop.jpeg";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import SignUp from './SignUp';
import MyForms from './MyForms';
import MyResponses from './MyResponses';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "./Navbar";

import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
        loggedin: false,
        user:"",
    };
  }

  componentWillMount() {
    const user = localStorage.getItem("user");
    if (user) {
      console.log(user);
      this.setState({ loggedin: true,user:user });
    }
  }

  render() {
    if (!this.state.loggedin) {
      return <Redirect to="/sign-in" />;
    }
    return (
      <>
        <Navbar/><br/>
            <Container>
            <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="My Forms">
                    <MyForms />
          </Tab>
                            <Tab eventKey="profile" title="My Responses">
            <MyResponses />
          </Tab>
        </Tabs></Col>
  </Row>
</Container>
        
      </>
    );
  }
}
