import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Copyrights from './Copyrights';

const MaindHOC = (WrappedComponent) => {
  
  return class extends Component {
    constructor(props){
      super(props);
      this.state = {
        show: false
      }
    }



    render() {
      return (
        <>
          <Header />
          <main><WrappedComponent {...this.props} /></main>
          <Footer/>
          <Copyrights />
        </>
      );
    }
  };
};

export default MaindHOC;
