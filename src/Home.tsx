import React from "react";
import logo from "./logo.svg";
import "./Home.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Login";
import EntryDetail from "./EntryDetail";
import NoMatch from "./NoMatch";
import Entries from "./Entries";
import EntryAdd from "./EntryAdd";

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          Edit <code>src/Home.tsx</code> and save to reload.
        </p>
        <a
          className="Home-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
