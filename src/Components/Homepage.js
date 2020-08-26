import React from "react";

import {Redirect} from "react-router-dom";

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state={ start:false,}
    }

  redirect = () => {
    this.setState({ start: true });
  }
 

render() {
  if (this.state.start == true) {
    return (
        <Redirect to="/sign-in"></Redirect>
    );
  }
    return (
        <>
        <div id="hp">
          <h1 class="fourth"><span>Test</span><span>Maker</span></h1> 
          <div id="hpi">
          <p>Create Tests</p>
            <p>Give Tests</p>
            </div>
            <button class="btn-hover color-7" onClick={this.redirect}>Get Started</button>          </div>
      </>
    );
  }
}

