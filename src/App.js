import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateForm from './Components/CreateForm';
import Homepage from './Components/Homepage';
import FillResponse from './Components/FillResponse';
import ShowResponse from './Components/ShowResponse';

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import User from "./Components/User";


function App() {
  const NoMatchPage = () => {
    return (
      <h3>404 - Not found</h3>
    );
  };
  return (
    <div className="App">

      <Router>
        <Switch>

        <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/create_form">
            <CreateForm />
          </Route>
          <Route path="/fill_response">
            <FillResponse />
          </Route>
           <Route path="/show_response">
          <ShowResponse />
          </Route> 
          <Route path="/user">
          <User />
          </Route> 

        <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route component={NoMatchPage} />

        </Switch>
      </Router>
      </div>
  );
}

export default App;
