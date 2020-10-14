import React, {Component} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieDeclaration from "../components/CookieDeclaration";

// const [show,setShow] = useState(false);

const MaindHOC = (WrappedComponent) => {
 
  let show = false;

  const getData = (val)=>{
    show = val;
  }
  return class extends Component {
    render() {
      return (
        <>
          <Header />
          <CookieDeclaration show={show}/>
          <WrappedComponent {...this.props} />
          <Footer sendData ={getData}/>
        </>
      );
    }
  };
};

export default MaindHOC;
