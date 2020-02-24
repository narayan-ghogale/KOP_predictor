import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import Register from './Components/Register';
import Welcome from './Components/Welcome';
import Details from './Components/Details2';
import Dashboard from './Components/Dashboard';
import Results from './Components/Results';
import Profile from './Components/Profile';
import { Route, Link, BrowserRouter as Router,Switch } from 'react-router-dom'
function App() {
  return (
    <div className="App">
     <Router>
    <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/details" component={Details}/>
        <Route path="/results" component={Results}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
      </Router>
      </div>  
  );
}

export default App;
