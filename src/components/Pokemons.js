import React, { useEffect, useRef } from 'react';
import Card from './Card';
import styles from '../styles/Pokemons.module.css';
import { connect } from 'react-redux';
import { updatePokemons, load } from '../redux/actions/globalActions';

const Pokemons = (props) => {
  const { currURL, nextURL, pokemons, isLoading } = props; // attributes
  const { update, load } = props; // functions

  useEffect(() => {
    console.log('Charging pokemons: ' + nextURL);
    update(currURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currURL])

  // TODO: Delete the observer
  useEffect(() => {
    console.log('initial url: ' + nextURL);
    var options = {
      root: null,
      threshold: 0.1
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loader = useRef();

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      if (!isLoading) {
        console.log("intersecting")
        load()
      }
    }
  }

  return (
    <div className={styles['pokemons-container']}>
      <div className={styles['pokemons']}>
        {
          pokemons.map((pokemon) => {
            return <Card key={pokemon.id} pokemon={pokemon} />
          })
        }
      </div>
      <div className={styles['loader']} ref={loader}>
        {/* loader */}
        </div>
      <div>
        {isLoading && 'Loading...'}
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
