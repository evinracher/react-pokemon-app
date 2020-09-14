import React from 'react';
import Card from './Card';
import styles from '../styles/Pokemons.module.css';

const Pokemons = () => {
  return (
    <div className={styles['pokemons-container']}>
      <div className={styles['pokemons']}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default Pokemons