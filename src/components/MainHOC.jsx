import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Copyrights from './Copyrights';
import ResponsiveComponents from '../components/responsiveness/ResponsiveComponents';

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
          <WrappedComponent {...this.props} />
          <ResponsiveComponents/>
          <Footer/>
          <Copyrights />
        </>
      );
    }
  };
};

export default MaindHOC;
