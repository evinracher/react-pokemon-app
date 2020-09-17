import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import ShowPokemon from './PokemonDetail';
import ComparePokemons from './PokemonComparison';
const Details = (props) => {
  const { isComparing, pokemonToShow, pokemonToCompare } = props;
  if (isComparing) {
    console.log({pokemonToShow});
    console.log({pokemonToCompare});
    return (
      <Modal>
        <ComparePokemons
          pokemonToShow={pokemonToShow}
          pokemonToCompare={pokemonToCompare}
        />
      </Modal>
    )
  } else {
    return (
      <Modal>
        <ShowPokemon pokemon={pokemonToShow} />
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isComparing: state.global.isComparing,
    pokemonToShow: state.global.pokemonToShow,
    pokemonToCompare: state.global.pokemonToCompare
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);