import React, { useEffect } from 'react';
import styles from '../styles/Search.module.css';
import { connect } from 'react-redux';
import { show, stopShow } from '../redux/actions/globalActions';
import { changeName, searchByName, compare } from '../redux/actions/pokemonActions';
import { useDebounce } from 'use-debounce';
const Search = (props) => {
  const [searchDebounce] = useDebounce(props.name, 500);

  useEffect(() => {
    if (props.name !== '') {
      props.show();
      console.log("Searching now for: " + props.name);
      props.search(props.name);
      props.compare();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce])

  const handleChange = (event) => {
    console.log()
    props.changeName(event.target.value.trim().replace(/\s+/g, "-"));
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
    pokemon: state.pokemon.pokemonToShow
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    show: () => dispatch(show()),
    stopShow: () => dispatch(stopShow()),
    search: (name) => dispatch(searchByName(name)),
    changeName: (name) => dispatch(changeName(name)),
    compare: () => dispatch(compare()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
