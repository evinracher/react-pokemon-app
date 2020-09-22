import React from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
} from "react-router-dom";

import Nav from './Nav';
import Home from './Home';
import Pokemons from './Pokemons';
import Info from './Info/index';

const Main = (props) => {
  const { isShowing } = props;
  console.log(process.env.PUBLIC_URL);
  return (
    <HashRouter>
      <Nav />
      <Route path='/' exact component={Home} />
      <Route path='/pokemons' component={Pokemons} />
      <Home />
      {isShowing && <Info />}
    </HashRouter>
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