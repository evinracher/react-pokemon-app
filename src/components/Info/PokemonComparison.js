import React from 'react';
import styles from '../../styles/Info/Index.module.css';
import comparison from '../../styles/Info/Comparison.module.css';
import { connect } from 'react-redux';
import { stopCompare } from '../../redux/actions/globalActions';
import Graphics from '../Graphics';

const PokemonComparison = (props) => {
  const { pokemonToShow, pokemonToCompare } = props;
  const handleClick = () => {
    props.close();
  }

  return (
    <div className={styles['details__container']} >
      <div className={styles['header']}>
        <div className={styles['header__info']}>
          <h2>{(pokemonToShow.name + ' vs. ' + pokemonToCompare.name).toUpperCase()}</h2>
        </div>
        <button className={styles['button--close']} onClick={handleClick}>x</button>
      </div>
      <hr className={styles['break-line']} />
      <div className={comparison['content']}>
        <div className={comparison['images']}>
          <img
            className={comparison['img']}
            src={pokemonToShow.imageUrl}
            alt={`Pokemon ${pokemonToShow.name}`} />
          <img
            className={comparison['img']}
            src={pokemonToCompare.imageUrl}
            alt={`Pokemon ${pokemonToCompare.name}`} />
        </div>
        <hr  className={styles['break-line']} />
        <div className={comparison['info']}>
          <div className={comparison['info__row']}>
            <p className={comparison['info__text']}>{pokemonToShow.height}m</p>
            <p className={comparison['info__title']}>Height</p>
            <p className={comparison['info__text']}>{pokemonToCompare.height}m</p>
          </div>
          <div className={comparison['info__row']}>
            <p className={comparison['info__text']}>{pokemonToShow.weight}kg</p>
            <p className={comparison['info__title']}>Weight</p>
            <p className={comparison['info__text']}>{pokemonToCompare.weight}kg</p>
          </div>
          <div className={comparison['info__row']}>
            <p className={comparison['info__text']}>{pokemonToShow.gender}</p>
            <p className={comparison['info__title']}>Gender</p>
            <p className={comparison['info__text']}>{pokemonToCompare.gender}</p>
          </div>
          <div className={comparison['info__row']}>
            <div className={comparison['info__abilities']}>
              {pokemonToShow.abilities.map((item, index) =>
                <p className={comparison['info__ability']} key={item + index}>{item.ability.name}</p>)}
            </div>
            <p className={comparison['info__title']}>Abilities</p>
            <div className={comparison['info__abilites']}>
              {pokemonToCompare.abilities.map((item, index) =>
                <p className={comparison['info__ability']} key={item + index}>{item.ability.name}</p>)}
            </div>
          </div>
        </div>
        <hr  className={styles['break-line']} />
      </div>
      <div className={comparison['stats']}>
        <Graphics
          dataset={[
            { data: pokemonToShow.stats_data },
            { data: pokemonToCompare.stats_data }
          ]} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(stopCompare())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonComparison)