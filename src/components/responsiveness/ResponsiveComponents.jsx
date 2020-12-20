import React, { Component } from 'react'
import Data from "./responsive-data.json";

export default class ResponsiveComponents extends Component {
  constructor() {
    super();
    this.state = {
      data: Data,
    };
  }
  render() {
    return (
      <div id="responsive-component">
      
      </div>
    );
  }
}
