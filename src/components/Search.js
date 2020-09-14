import React, { useEffect } from 'react';
import styles from '../styles/Search.module.css';
import { connect } from 'react-redux';
import { show, stopShow } from '../redux/actions/globalActions';
import { changeName, searchByName } from '../redux/actions/pokemonActions';
import { useDebounce } from 'use-debounce';
const Search = (props) => {
  const [searchDebounce] = useDebounce(props.name, 500);

  useEffect(() => {
    if (props.name !== '') {
      props.show();
      console.log("Searching now for: " + props.name);
      props.search(props.name);
    } else {
      props.changeName('');
      props.stopShow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce])

  useEffect(() => {
    if (props.name === '') {
      console.log("It was rendered the first time");
    } else {
      console.log("re-rendered");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event) => {
    console.log()
    props.changeName(event.target.value.trim().replace(/\s+/g, "-"));
  }

  const handleBlur = (event) => {
    console.log()
    event.target.value = '';
    props.stopShow();
    props.changeName('');
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
    name: state.pokemon.nameToSearch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    show: () => dispatch(show()),
    stopShow: () => dispatch(stopShow()),
    search: (name) => dispatch(searchByName(name)),
    changeName: (name) => dispatch(changeName(name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
