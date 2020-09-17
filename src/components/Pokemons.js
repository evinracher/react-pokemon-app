import React, { useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Pokemons.module.css';
import { connect } from 'react-redux';
import { updatePokemons, load } from '../redux/actions/globalActions';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { SyncLoader } from 'react-spinners';

const Pokemons = (props) => {
  const {
    currURL,
    pokemons,
    isSearching,
    isLoading,
    isComparing,
    pokemonToShow,
    pokemonToCompare } = props; // attributes
  const { update, load } = props; // functions
  const hasNextPage = props.nextURL !== null ? true : false;

  useEffect(() => {
    update(currURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currURL])

  function handleLoadMore() {
    if (!isSearching) {
      load();
    }
  }

  const infiniteRef = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: handleLoadMore,
  });

  return (
    <div className={styles['pokemons']}>
      <div className={styles['list-container']}>
        {isComparing && pokemonToCompare === null &&
          <div className={styles['comparing']}>
            <p className={styles['comparing__title']}>Comparing pokemon</p>
            <p className={styles['comparing__name']}>{pokemonToShow.name.toUpperCase()}</p>
          </div>
        }
        <div className={styles['list']} ref={infiniteRef}>
          {
            pokemons.map((pokemon) => {
              return <Card key={pokemon.id} pokemon={pokemon} />
            })
          }
        </div>
      </div>
      {isLoading &&
        <div className={styles['loader']}>
          <SyncLoader className={styles['loader__spiner']} />
          <h2 className={styles['loader__text']}>Loading...</h2>
        </div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("State in global: ");
  console.log(state);
  return {
    isLoading: state.global.isLoading,
    isSearching: state.global.isSearching,
    nextURL: state.global.nextURL,
    currURL: state.global.currURL,
    isComparing: state.global.isComparing,
    pokemonToShow: state.global.pokemonToShow,
    pokemonToCompare: state.global.pokemonToCompare
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