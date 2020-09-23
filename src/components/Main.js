import React from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Pokemons from './Pokemons';
import Info from './Info/index';

const Main = (props) => {
  const { isShowing, isSearching, pokemonsList, pokemonsFiltered } = props;
  const pokemons = isSearching ? pokemonsFiltered : pokemonsList;
  return (
    <HashRouter>
      <Nav />
      <Route path='/pokemons'>
        <Pokemons pokemons={pokemons} />
      </Route>
      <Route path='/' exact>
        <Home />
      </Route>
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