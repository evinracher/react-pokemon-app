import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { stopShow } from '../../redux/actions/globalActions';
import ShowPokemon from './PokemonDetail';
import Request from './RequestInfo';
const Details = (props) => {
  const { isSearching, pokemonSearched } = props;
  if (isSearching) {
    return (
      <Modal>
        <Request error={props.error} close={props.stopShow} />
      </Modal>
    )
  } else {
    return (
      <Modal>
        <ShowPokemon />
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pokemonSearched: state.pokemon.pokemonSearched,
    isSearching: state.pokemon.isSearching,
    error: state.pokemon.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stopShow: () => dispatch(stopShow())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);