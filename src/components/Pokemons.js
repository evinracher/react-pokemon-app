import React, { useEffect, useRef } from 'react';
import Card from './Card';
import styles from '../styles/Pokemons.module.css';
import { connect } from 'react-redux';
import { updatePokemons, load } from '../redux/actions/globalActions';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { SyncLoader } from 'react-spinners';

const Pokemons = (props) => {
  const { currURL, nextURL, pokemons, isLoading } = props; // attributes
  const { update, load } = props; // functions
  const hasNextPage = props.nextURL !== null ? true : false;

  useEffect(() => {
    update(currURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currURL])

  function handleLoadMore() {
    load();
  }

  const infiniteRef = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: handleLoadMore,
  });

  return (
    <div className={styles['pokemons-container']}>
      <div className={styles['pokemons']} ref={infiniteRef}>
        {
          pokemons.map((pokemon) => {
            return <Card key={pokemon.id} pokemon={pokemon} />
          })
        }
      </div>
      <div className={styles['loader']}>
        {isLoading && (<div>
          <SyncLoader />
          <p>Loading...</p>
        </div>)}
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
    currURL: state.global.currURL,
    pokemons: state.global.pokemonsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (nextURL) => dispatch(updatePokemons(nextURL)),
    load: () => dispatch(load())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemons)
