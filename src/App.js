import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { getAuth } from "./utils";
import Home from "./containers/Home";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Search from "./containers/Search";
import Faq from "./containers/Faq";

const ProcessedRoute = ({
  component: Component,
  type,
  permissions,
  redirectTo,
  ...rest
}) => {
  const isLoggedIn = getAuth().isLoggedIn;
  let processedComp;

  if (type === "showIfLoggedIn") {
    processedComp = (
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  } else if (type === "showIfNotLoggedIn") {
    processedComp = (
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn !== true ? (
            <Component {...props} />
          ) : (
            <Redirect to={redirectTo || "/"} />
          )
        }
      />
    );
  } else if (type === "showAnyTime" || type === "") {
    processedComp = (
      <Route {...rest} render={(props) => <Component {...props} />} />
    );
  }

  return processedComp;
};

function App() {
  return (
    <>
      <Router>
        <Switch>
          <ProcessedRoute path="/" exact component={Home} type="showAnyTime" />
          <ProcessedRoute
            path="/search/:city?"
            component={Search}
            type="showAnyTime"
          />
          <ProcessedRoute path="/about" component={About} type="showAnyTime" />
          <ProcessedRoute
            path="/contact"
            component={Contact}
            type="showAnyTime"
          />
          <ProcessedRoute path="/faq" component={Faq} type="showAnyTime" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
