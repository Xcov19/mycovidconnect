import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Copyrights from './Copyrights';

const MaindHOC = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <>
          <Header />
          <WrappedComponent {...this.props} />
          <Footer />
          <Copyrights />
        </>
      );
    }
  };
};

export default MaindHOC;
