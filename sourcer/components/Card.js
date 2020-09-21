import React, { useRef } from 'react';
import styles from '../styles/Card.module.css';
import { connect } from 'react-redux';
import { show } from '../redux/actions/globalActions';
const Card = (props) => {
  const { name, imageUrl } = props.pokemon;
  const { isComparing } = props; // state variables
  const { showThisPokemon } = props; // state functions
  const selectedPokemon = useRef();

  const handleCardClick = (event) => {
    if (isComparing) {
      showThisPokemon(null, props.pokemon);
    } else {
      showThisPokemon(props.pokemon);
    }
  }

  return (
    <div
      className={styles['card']}
      onClick={handleCardClick}
    >
      <div className={styles['card__img-container']}>
        <img className={styles['card__img']} src={imageUrl} alt="pokemon" />
      </div>
      <div className={styles['card__description']}>
        <p className={styles['card__name']} ref={selectedPokemon}>{name.toUpperCase()}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isShowing: state.global.isShowing, // delete
    isComparing: state.global.isComparing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showThisPokemon: (pokemonToShow, pokemonToCompare) => dispatch(show(pokemonToShow, pokemonToCompare)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)
