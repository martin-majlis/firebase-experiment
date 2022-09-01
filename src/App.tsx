import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./firebase";
import Login from "./Login";
import EntryDetail from "./EntryDetail";
import Entries from "./Entries";
import EntryAdd from "./EntryAdd";
import Home from "./Home";
import EntriesList from "./EntriesList";

function App() {
  const [user /*, loading, error*/] = useAuthState(auth);
  return (
    <div className="App">
      <Router>
        <p>
          <Link to="/">Home</Link> |<Link to="/login">Login</Link> |
          <Link to="/entry">Entries</Link> |
          <Link to="/entry/add">Add Entry</Link> | User:{" "}
          {user ? (
            <span>
              {user.displayName}{" "}
              <button onClick={() => logout()}>Log Out</button>
            </span>
          ) : (
            <span>Anonymous</span>
          )}
        </p>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="entry" element={<Entries />}>
            <Route path=":entryId" element={<EntryDetail />} />
            <Route path="add" element={<EntryAdd />} />
            <Route index element={<EntriesList />} />
          </Route>
          <Route path="" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
