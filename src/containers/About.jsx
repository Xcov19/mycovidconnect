import React, { Component } from "react";
import MaindHOC from "../components/MainHOC";

class About extends Component {
  render() {
    return (
      <>
        <h1>About</h1>
      </>
    );
  }
}

export default MaindHOC(About);
