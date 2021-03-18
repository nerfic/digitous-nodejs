import './App.css';
import { useState, useEffect } from "react"
import Signup from "./views/signup"
import Login from "./views/Login"
import Admin from "./views/Admin"
import Logout from "./views/Logout"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

function App() {

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
      {!isConnected &&
        <>
          <Link className="mr-3" to="/login">Login</Link>
          <Link className="mr-3" to="/signup">Signup</Link>
        </>
      }
      {isConnected &&
        <>
        <Link className="mr-3" to="/admin">Admin</Link>
        <Link onClick={() => {return localStorage.removeItem('token')}} className="mr-3" to="/logout">Logout</Link>
        </>
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
