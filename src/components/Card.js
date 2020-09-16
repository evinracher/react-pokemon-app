import React, {useRef} from 'react';
import styles from '../styles/Card.module.css';
const Card = (props) => {
  const name = useRef();

  const handleCardClick = (event) =>{
    console.log('Click on: ');
    console.log(name.current);
  }
  return (
    <div
    className={styles['card']}
    onClick={handleCardClick}
    >
      <img className={styles['card__img']} src={props.imageUrl} alt="pokemon"/>
      <div className={styles['card__description']}>
        <p className={styles['card__name']} ref={name}>{props.name}</p>
      </div>
    </div>
  )
}

export default Card;