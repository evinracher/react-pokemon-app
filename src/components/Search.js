import React from 'react';
import styles from '../styles/Search.module.css';
import { connect } from 'react-redux';
import { show, stopShow } from '../redux/actions/globalActions';
const Search = (props) => {
  const handleChange = (event) => {
    // TODO
  }

  const handleBlur = (event) => {
    // TODO: or maybe to change for an x
    console.log()
    // event.target.value = '';
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
    // TODO
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO
    show: () => dispatch(show()),
    stopShow: () => dispatch(stopShow()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
