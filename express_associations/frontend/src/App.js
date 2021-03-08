import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import Admin from "./views/Admin"
import Home from "./views/Home"
import './App.css';

function App() {

  return (
    <Router>
      <Link style={{ marginRight: "10px" }} to="/">Home</Link>
      <Link to="/admin">Admin</Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
