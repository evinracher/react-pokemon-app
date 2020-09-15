import React from 'react';
// TODO: Separate specific css per file into Details
import styles from '../../styles/Details.module.css';
// import { getClassNames } from '../../Utils';
import { connect } from 'react-redux';
import { compare, stopCompare } from '../../redux/actions/pokemonActions';
const PokemonComparison = (props) => {
  const { pokemonToCompare, pokemonToShow } = props;

  const handleClick = () => {
    props.close();
  }

  return (
    <div className={styles['pokemon__comparison']} >
      <div className={styles['header']}>
        <div className={styles['header__info']}>
          <h2>{(pokemonToCompare.name + ' vs. ' + pokemonToShow.name).toUpperCase()}</h2>
        </div>
        <button className={styles['button--close']} onClick={handleClick}>x</button>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    name: state.pokemon.nameToSearch,
    pokemonToShow: state.pokemon.pokemonToShow,
    pokemonToCompare: state.pokemon.pokemonToCompare,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    compare: () => dispatch(compare()),
    close: () => dispatch(stopCompare())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonComparison)