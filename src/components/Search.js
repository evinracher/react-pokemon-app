import React from 'react';
import styles from '../styles/Search.module.css';
import { getClassNames } from '../Utils';

const Search = () => {
  return (
    <div className={styles['search']}>
      <input className={styles['search__input']} placeholder="Search"></input>
    </div>
  )
}

export default Search