import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import ShowPokemon from './PokemonDetail';
const Details = (props) => {
  return (
    // TODO
    // ifsearching
    // ShowPokemon
    // if comparing
    // comparePokemons
    <Modal>
      <ShowPokemon />
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    // TODO
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);