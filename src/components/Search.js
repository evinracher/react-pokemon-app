import React from 'react';
import styles from '../styles/Search.module.css';
import { connect } from 'react-redux';
import { show } from '../redux/actions/globalActions';
import { searchByName } from '../redux/actions/pokemonActions';
const Search = (props) => {

  const handleChange = (event) => {
    // console.log(event.target.value);
    props.dispatch(show());
    // event.target.blur();
    // TODO: show if it found a pokemon
    props.dispatch(searchByName(event.target.value.trim()));
  }

  return (
    <div className={styles['search']}>
      <input className={styles['search__input']} type="text" placeholder="Search" onChange={handleChange}></input>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);

  return {
    isShowing: state.global.isShowing
  }
}

export default connect(
  mapStateToProps
)(Search)
