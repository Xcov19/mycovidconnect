import React, { Component } from 'react';
import MaindHOC from '../components/MainHOC';

class Profile extends Component {

  render(){
    return (
      <div>
          Profile page works!!
      </div>
     );
  }
}

export default MaindHOC(Profile);
