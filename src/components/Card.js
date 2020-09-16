import React, {useRef} from 'react';
import styles from '../styles/Card.module.css';
const Card = (props) => {
  const {name, imageUrl} = props.pokemon;
  const selectedPokemon = useRef();

  const handleCardClick = (event) =>{
    console.log('Click on: ');
    console.log(props.pokemon);
  }
  return (
    <div
    className={styles['card']}
    onClick={handleCardClick}
    >
      <img className={styles['card__img']} src={imageUrl} alt="pokemon"/>
      <div className={styles['card__description']}>
        <p className={styles['card__name']} ref={selectedPokemon}>{name.toUpperCase()}</p>
      </div>
    </div>
  )
}

export default Card;