import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { stopShow } from '../../redux/actions/globalActions';
import styles from '../../styles/Details.module.css';
import Pokemon from './PokemonDetail';
import Request from './RequestInfo';
const Details = (props) => {
  const {pokemon } = props;
  
  return (
    <Modal>
      <div className={styles['details']}>
        { pokemon === null
          ?
          (
            <Request error={props.error} close={props.stopShow}/>
          )
          : <Pokemon pokemon={props.pokemon} close={props.stopShow} />}
      </div>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    isSearching: state.pokemon.isSearching,
    pokemon: state.pokemon.pokemonToShow,
    error: state.pokemon.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stopShow: () => dispatch(stopShow())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);