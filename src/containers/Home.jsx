import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../actions/app";
import MaindHOC from "../components/MainHOC";

class Home extends Component {
  componentDidMount() {
    const { doReadLocation } = this.props.appActions;
    doReadLocation({
      city: "bangalore",
    });
  }

  render() {
    return (
      <>
        <MetaTags>
          <title>MyCovidConnect: Find Nearest Healthcare facility</title>
          <meta
            name="description"
            content="MyCovidConnect: Find Nearest Healthcare facility"
          />
          <meta
            name="keywords"
            content="MyCovidConnect: Find Nearest Healthcare facility"
          />
        </MetaTags>
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

const mapStateToProps = (store) => {
  return {
    app: store.app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  };
};

export default MaindHOC(connect(mapStateToProps, mapDispatchToProps)(Home));
