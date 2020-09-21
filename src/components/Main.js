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
import Info from './Info/index';

const Main = (props) => {
  const { isShowing, isSearching, pokemonsList, pokemonsFiltered } = props;
  const pokemons = isSearching ? pokemonsFiltered : pokemonsList;
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Nav />
      <Switch>
        <Route path="/pokemons">
          <Pokemons pokemons={pokemons} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      {isShowing && <Info />}
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    isShowing: state.global.isShowing,
    isSearching: state.global.isSearching,
    pokemonsList: state.global.pokemonsList,
    pokemonsFiltered: state.global.pokemonsFiltered
  }
}

export default connect(
  mapStateToProps,
)(Main)