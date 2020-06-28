import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Pages/Dashboard.js'
import Home from './Pages/Home.js'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Dashboard/:username"  exact component={Dashboard}>
          </Route>
          <Route path="/" exact component={Home}>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
