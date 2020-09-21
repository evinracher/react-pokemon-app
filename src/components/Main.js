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
  console.log(process.env.PUBLIC_URL);
  return (
    <Router basename={'/pokemon-react-app'}>
      <Nav />
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/`}>
          <Home />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/pokemons`}>
          <Pokemons pokemons={pokemons} />
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