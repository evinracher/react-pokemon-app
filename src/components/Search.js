import React from 'react';
import styles from '../styles/Search.module.css';
import { connect } from 'react-redux';
import { show, stopShow, search, stopSearch } from '../redux/actions/globalActions';
const Search = (props) => {
  const { search, stopSearch, pokemonsList } = props;
  const handleChange = (event) => {
    let name = event.target.value.trim().replace(/\s+/g, "-");
    console.log(name);
    console.log(name === '');
    if (name === '') {
      stopSearch();
    }else {
      search(name, pokemonsList);
    }
  }

  return (
    <div className={styles['search']}>
      <input
        className={styles['search__input']}
        type="search"
        placeholder="Search"
        onChange={handleChange}>
      </input>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    pokemonsList: state.global.pokemonsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    show: () => dispatch(show()),
    stopShow: () => dispatch(stopShow()),
    search: (name, pokemons) => dispatch(search(name, pokemons)),
    stopSearch: () => dispatch(stopSearch()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
