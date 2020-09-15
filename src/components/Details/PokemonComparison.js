import React from 'react';
import styles from '../../styles/Details.module.css';
// import { getClassNames } from '../../Utils';
import { connect } from 'react-redux';
import { compare } from '../../redux/actions/pokemonActions';
import { stopShow } from '../../redux/actions/globalActions';
const PokemonComparison = (props) => {
  const pokemon = props.pokemon;

  const handleClick = () => {
    props.close();
  }

  const handleChange = () => {
    props.compare();
  }

  return (
    <div className={styles['pokemon__comparison']} >
      <h1>Comparing</h1>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    name: state.pokemon.nameToSearch,
    pokemon: state.pokemon.pokemonToShow,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    compare: () => dispatch(compare()),
    close: () => dispatch(stopShow())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonComparison)