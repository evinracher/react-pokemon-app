import React from 'react';
import styles from '../styles/Nav.module.css';
import { getClassNames } from '../Utils';
import {
  Link,
} from 'react-router-dom';
import Search from './Search'

const Nav = () => {
  return (
    <div className={styles['nav-container']}>
      <nav className={styles['nav']}>
        <ul className={styles['nav__items']}>
          <li className={styles['nav__item']}>
            <Link className={getClassNames(styles, ['nav__link', 'nav__link--home'])} to='/'>PokéApp</Link>
          </li>
          <li className={styles['nav__item']}>
            <Link className={getClassNames(styles, ['nav__link', 'nav__link--pokemons'])} to='/pokemons'>Pokemons</Link>
          </li>
        </ul>
      </nav>
      <Search />
    </div>
  )
}

export default Nav