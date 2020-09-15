import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Nav from './Nav';
import Home from './Home';
import Pokemons from './Pokemons';
import Details from './Details/index';

const Main = (props) => {
  const {isShowing} = props;
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
      {isShowing && <Details />}
    </Router>
  )
}


const mapStateToProps = (state) => {
  return {
    isShowing: state.global.isShowing
  }
}

export default connect(mapStateToProps)(Main)