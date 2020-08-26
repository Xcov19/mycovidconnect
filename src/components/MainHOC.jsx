import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";

const MaindHOC = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <>
          <Header />
          <WrappedComponent {...this.props} />
          <Footer />
        </>
      );
    }
  };
};

export default MaindHOC;
