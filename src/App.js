import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Nav from './components/Nav';
import Home from './components/Home';
import Pokemons from './components/Pokemons';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/pokemons">
          <Pokemons />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

    </Router>
  )
}

export default App