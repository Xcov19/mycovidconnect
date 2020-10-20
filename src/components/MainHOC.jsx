import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Copyrights from './Copyrights';
import CookieDeclaration from "./CookieDeclaration";


const MaindHOC = (WrappedComponent) => {
  
  return class extends Component {
    constructor(props){
      super(props);
      this.state = {
        show: false
      }
    }

    getData = (val) =>{
      this.setState({
        show: val
      })
    }

    render() {
      return (
        <>
          <Header />
          <CookieDeclaration show={this.state.show}/>
          <WrappedComponent {...this.props} />
          <Footer sendData ={this.getData}/>
          <Copyrights />
        </>
      );
    }
  };
};

export default MaindHOC;
