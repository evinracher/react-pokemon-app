import React from 'react';
import styles from '../styles/Card.module.css';
const Card = () => {
  return (
    <div className={styles['card']}>
      {/* <img className={styles['card__img']} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="BULBASAUR"> */}
      {/* </img> */}
      <div className={styles['card__description']}>
        <p className={styles['card__name']}>BULBASAUR</p>
      </div>
    </div>
  )
}

export default Card;