import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { stopShow } from '../../redux/actions/globalActions';
import styles from '../../styles/Details.module.css';
import ShowPokemon from './PokemonDetail';
import ComparePokemons from './PokemonComparison';
import Request from './RequestInfo';
const Details = (props) => {
  const { isComparing, isSearching, pokemonToCompare, pokemonToShow } = props;
  return (
    <Modal>
      <div className={styles['details']}>
        {isSearching && pokemonToShow === null
          ?
          (
            <Request error={props.error} close={props.stopShow} />
          )
          : (
            <ShowPokemon />)}
      </div>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    pokemonToShow: state.pokemon.pokemonToShow,
    isSearching: state.pokemon.isSearching,
    pokemonToCompare: state.pokemon.pokemonToCompare,
    isComparing: state.pokemon.isComparing,
    error: state.pokemon.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stopShow: () => dispatch(stopShow())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);