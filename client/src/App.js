import Topbar from './Topbar/Topbar'
import Home from './pages/Home/Home'
import Single from '../src/pages/single/single'
import Write from '../src/pages/Write/write'
import Setting from '../src/pages/Setting/Setting'
import Login from '../src/pages/Login/Login'
import Register from '../src/pages/Register/Register'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/context";
import './App.css'
function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
     <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts">
          <Home />
        </Route>
        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">
          {user ? <Setting /> : <Login />}
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
