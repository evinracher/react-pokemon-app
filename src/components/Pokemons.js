import React, { useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Pokemons.module.css';
import { connect } from 'react-redux';
import { updatePokemons } from '../redux/actions/globalActions';

const Pokemons = (props) => {
  const { nextURL, update, pokemons, isLoading } = props;

  useEffect(() => {
    update(nextURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(pokemons);
  const handleLoadMoreClick = () => {
    console.log('loading more...');
    update(nextURL);
  }
  return (
    <div className={styles['pokemons-container']}>
      <div className={styles['pokemons']}>
        {
          pokemons.map((pokemon) => {
            return <Card key={pokemon.id} pokemon={pokemon}/>
          })
        }
      </div>
      <div>
        <button onClick={handleLoadMoreClick}>{isLoading ? 'Loading...':'Load more...'}
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("State in global: ");
  console.log(state);
  return {
    isLoading: state.global.isLoading,
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
