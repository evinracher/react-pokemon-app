import React, { useRef } from 'react';
import styles from '../styles/Search.module.css';
import { connect } from 'react-redux';
import { show, stopShow, search, stopSearch } from '../redux/actions/globalActions';
const Search = (props) => {
  const { search, stopSearch, pokemonsList } = props;
  const input = useRef();
  const handleChange = (event) => {
    let name = event.target.value.trim().replace(/\s+/g, "-");
    console.log(name);
    console.log(name === '');
    if (name === '') {
      console.log('Stoping...')
      stopSearch();
    } else {
      search(name, pokemonsList);
    }
    console.dir(input.current.attributes);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    let name = input.current.value.trim().replace(/\s+/g, "-");
    if (name === '') {
      stopSearch();
    } else {
      search(name, pokemonsList);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles['search']}>
        <input
          className={styles['search__input']}
          type="search"
          id="mySearch"
          name="q"
          placeholder="Search"
          onChange={handleChange}
          ref={input}
        >
        </input>
      </div>
    </form>
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
