import React, { Component } from "react";
import MaindHOC from "../components/MainHOC";

class Home extends Component {
  render() {
    return (
      <>
        <div id="banner">
          <div className="banner-in">
            <h1>Big Title</h1>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt
            </p>
            <button>
              <h2>SOS</h2>
              <p>
                Find Hospitak <br /> Near Me
              </p>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default MaindHOC(Home);
