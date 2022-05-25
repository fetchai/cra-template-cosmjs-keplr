import logo from "../logo.svg";
import React, {ChangeEvent, SyntheticEvent, useCallback, useState} from "react";
import {sayHello} from "../api/sayHello";




export const HelloDapp: React.FC<{}> = () => {
  const [greeting, setGreeting] = useState<string>("");

  const _setGreeting = useCallback((event: ChangeEvent) => {
    // @ts-ignore
    console.log(event.target.value);
    console.log(event);
    // @ts-ignore
    setGreeting(event.target.value);
  }, [setGreeting]);

  const _sayHello = useCallback(() => {
    sayHello(greeting)
  }, [greeting])

  return <header className="App-header">
    <img src={logo} className="App-logo" alt="logo"/>
    <p>
      <input type="text" placeholder="Tell us about your experience!" aria-valuetext={greeting} value={greeting} onChange={_setGreeting}/>
      <button onClick={_sayHello}>Say Hello</button>
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
