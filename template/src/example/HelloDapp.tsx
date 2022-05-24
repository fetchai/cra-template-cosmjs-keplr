import logo from "./logo.svg";
import React from "react";

export const HelloDapp: React.FC<{}> = () => {
  return <header className="App-header">
    <img src={logo} className="App-logo" alt="logo"/>
    <p>
      <input type="text" value="I'm a textbox!"/>
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>;
};
