import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            details: {
            email: "",
            password: "",
            },
            loggedin:false,
        };
    }

    componentWillMount() {
        const user = localStorage.getItem("user");
        if (user) {
          this.setState({ loggedin: true });
        }
        }

    mySubmitHandler = (event) => {
        event.preventDefault();
          axios
            .post("http://localhost:9000/login", this.state.details)
              .then((res) => {
                  if (res.data === false)
                      alert("username or password is incorrect.")
                  else {
                    let user = res.data;
                    localStorage.setItem("user", JSON.stringify(user[0]));
                    localStorage.setItem("username", JSON.stringify(user[0].fname));
                    localStorage.setItem("email", JSON.stringify(user[0].email));
                  this.setState({ loggedin: true});
                  }
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            }); 
    };

    myChangeHandler = (e) => {
        console.log(e.target.value);
        let details = { ...this.state.details }

     if (e.target.name === "em") details.email = e.target.value;
        else if (e.target.name === "pw") details.password = e.target.value;
        this.setState({ details });

        console.log(this.state);
    };
    
    render() {
        if (this.state.loggedin) {
            return (
                <Redirect to="/user"></Redirect>
            );
            }
        return (
            
        <div className="auth-wrapper">
        <div className="auth-inner">
            <form onSubmit={this.mySubmitHandler}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="em" className="form-control" placeholder="Enter email" required onChange={(e) => this.myChangeHandler(e)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="pw" className="form-control" placeholder="Enter password" required onChange={(e) => this.myChangeHandler(e)}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Dont have an account <a href="sign-up">sign up?</a>
                </p>
                    </form>
                    </div></div>
        );
    }
}