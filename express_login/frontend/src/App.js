import './App.css';
import Signup from "./views/signup"
import Login from "./views/Login"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

function App() {
  return (
    <Router>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
