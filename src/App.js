import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Search from "./containers/Search";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:city?" component={Search} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
