import React, { useEffect } from 'react';
import styles from '../styles/Search.module.css';
import { connect } from 'react-redux';
import { show, stopShow } from '../redux/actions/globalActions';
import {
  initPokemon,
  changeNameToSearch,
  searchByName,
} from '../redux/actions/pokemonActions';
import { useDebounce } from 'use-debounce';
const Search = (props) => {
  const [searchDebounce] = useDebounce(props.name, 500);

  useEffect(() => {
    if (props.name != null) {
      props.initPokemon();
      props.show();
      console.log("Searching now for: " + props.name);
      props.search(props.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce])

  const handleChange = (event) => {
    console.log()
    props.changeNameToSearch(event.target.value);
  }

  const handleBlur = (event) => {
    console.log()
    event.target.value = '';
  }

  return (
    <div className={styles['search']}>
      <input
        className={styles['search__input']}
        type="text"
        placeholder="Search"
        onChange={handleChange}
        onBlur={handleBlur}></input>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    name: state.pokemon.nameToSearch,
    pokemon: state.pokemon.pokemonSearched
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPokemon: () => dispatch(initPokemon()),
    show: () => dispatch(show()),
    stopShow: () => dispatch(stopShow()),
    search: (name) => dispatch(searchByName(name)),
    changeNameToSearch: (name) => dispatch(changeNameToSearch(name)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
