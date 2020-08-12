import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";



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
        };
    }
    
    mySubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.details.fname.trim() != "" && this.state.details.lname.trim() != "") {
          axios
            .post("http://localhost:9000/register", this.state.details)
            .then((res) => {
                console.log(res.data);
              this.setState({ loggedin:true });
            })
            .catch((err) => {
              console.error(err);
            });
        } else alert("Fill all details correctly");
    };

    myChangeHandler = (e) => {
        console.log(e.target.value);
        let details = { ...this.state.details }
        
        if (e.target.name === "fn") details.fname = e.target.value; 
        else if (e.target.name === "ln") details.lname = e.target.value;
        else if (e.target.name === "em") details.email = e.target.value; 
        else if (e.target.name === "pw") details.password = e.target.value;
        this.setState({ details });
        console.log(this.state);
      };
    
        

render() {
    if (this.state.loggedin) {
        return (
            <Redirect to="/login"></Redirect>
        );
        }
        return (
            <form onSubmit={this.mySubmitHandler}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="fn" className="form-control" placeholder="First name" required onChange={(e) => this.myChangeHandler(e)}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" name="ln" className="form-control" placeholder="Last name" required onChange={(e) => this.myChangeHandler(e)}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="em" className="form-control" placeholder="Enter email" required onChange={(e) => this.myChangeHandler(e)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="pw" className="form-control" placeholder="Enter password" required onChange={(e) => this.myChangeHandler(e)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}