import './App.css';
import { useState, useEffect } from "react"
import Signup from "./views/signup"
import Login from "./views/Login"
import Admin from "./views/Admin"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isConnected, setIsConnected] = useState(false)

  const connected = () => {
    fetch('http://localhost:8000/admin', {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        console.log(response.status);
        if (response.status === 401) {
          setIsConnected(false)
        } else {
          setIsConnected(true)
        }
        return response.json()
      })
  }

  useEffect(() => {
    connected()
  }, [])

  return (
    <Router>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      {isConnected &&
        <Link to="/admin">Admin</Link>
      }
      <Switch>
        <Route path="/login">
          <Login isConnected={connected}></Login>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
        <Route path="/admin">
          <Admin></Admin>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
