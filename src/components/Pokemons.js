import React, { useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Pokemons.module.css';
import { connect } from 'react-redux';
import { updatePokemons } from '../redux/actions/globalActions';

const Pokemons = (props) => {
  const { nextURL, update, pokemons } = props;

  useEffect(() => {
    update(nextURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(pokemons);
  return (
    <div className={styles['pokemons-container']}>
      <div className={styles['pokemons']}>
        {
          pokemons.map((pokemon) => {
            console.log("Pokemon:");
            console.log(pokemon);
            return <p>{pokemon.name}</p>;
          })
        }

        {/* <Card /> */}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("State in global: ");
  console.log(state);
  return {
    nextURL: state.global.nextURL,
    pokemons: state.global.pokemonsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (nextURL) => dispatch(updatePokemons(nextURL)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemons)
