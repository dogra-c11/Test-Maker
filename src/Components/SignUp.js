import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      details: {
        fname: "",
        lname: "",
        email: "",
        password: "",
      },
      loggedin: false,
      loadingbtn: false,
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    if (
      this.state.details.fname.trim() != "" &&
      this.state.details.lname.trim() != ""
    ) {
      this.setState({ loadingbtn: true }, () => {
        axios
          .post(
            "https://cors-anywhere11.herokuapp.com/https://testmaker-server.herokuapp.com/register",
            this.state.details,
          )
          .then((res) => {
            this.setState({ loadingbtn: false });
            if (res.data === "no") alert("email id already exists");
            else {
              alert(res.data);
              this.setState({ loggedin: true });
            }
          })
          .catch((err) => {
            console.error(err);
            this.setState({ loadingbtn: false });
          });
      });
    } else alert("Fill all details correctly");
  };

  myChangeHandler = (e) => {
    let details = { ...this.state.details };
    if (e.target.name === "fn") details.fname = e.target.value;
    else if (e.target.name === "ln") details.lname = e.target.value;
    else if (e.target.name === "em") details.email = e.target.value;
    else if (e.target.name === "pw") details.password = e.target.value;
    this.setState({ details });
  };

  render() {
    if (this.state.loggedin) {
      return <Redirect to="/sign-in"></Redirect>;
    }
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.mySubmitHandler}>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                name="fn"
                className="form-control"
                placeholder="First name"
                required
                onChange={(e) => this.myChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                name="ln"
                className="form-control"
                placeholder="Last name"
                required
                onChange={(e) => this.myChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="em"
                className="form-control"
                placeholder="Enter email"
                required
                onChange={(e) => this.myChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="pw"
                className="form-control"
                placeholder="Enter password"
                required
                onChange={(e) => this.myChangeHandler(e)}
              />
            </div>

            {this.state.loadingbtn === false ? (
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
            ) : (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Registering...
              </Button>
            )}
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
