import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {" "}
          Edit <code> src / App.js </code> and save to reload.{" "}
        </p>{" "}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Learn React{" "}
        </a>{" "}
      </header>{" "}
    </div>
  );
}

/**
 * Repeats a given string a certain number of times.
 *
 * @param {string} text - Text to repeat
 * @param {number} count - Number of times
 * @returns {Array.<number|string>} - Returns a repeated string
 */
function repeatStr(text, count) {
  return Array(count + 1).join(text);
}

export default App;
export {repeatStr}; 