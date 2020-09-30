import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Copyright from "./Copyright";

const MaindHOC = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <>
          <Header />
          <WrappedComponent {...this.props} />
          <Footer />
          <Copyright/>
        </>
      );
    }
  };
};

export default MaindHOC;
