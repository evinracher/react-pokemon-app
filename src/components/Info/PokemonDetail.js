import React from 'react';
import styles from '../../styles/Info/Index.module.css';
import details from '../../styles/Info/Details.module.css';
import { getClassNames } from '../../Utils';
import { connect } from 'react-redux';
import { stopShow, compare } from '../../redux/actions/globalActions';
import Graphics from '../Graphics';

const PokemonDetail = (props) => {
  const { pokemon } = props;
  const { close, compare } = props;

  const handleClick = () => {
    close();
  }

  const handleCompareClick = () => {
    compare();
  }

  return (
    <div className={getClassNames(details, ['details__container'])} >
      <div className={styles['header']}>
        <div className={styles['header__info']}>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <button className={details['button-compare']}
            onClick={handleCompareClick}
          >
            Compare to...
          </button>
        </div>
        <button className={styles['button--close']} onClick={handleClick}>x</button>
      </div>
      <hr className={styles['break-line']} />
      <div className={details['content']}>
        <div className={details['info']}>
          <div className={details['info__img-container']}>
            <img
              className={details['info__img']}
              src={(pokemon.imageUrl)}
              alt={`Pokemon ${pokemon.name}`} />
          </div>
          <div className={details['info__content']}>
            <p className={details['info__text']}>{pokemon.description}</p>
            <hr />
            <div className={details['info__attributes']}>
              <div className={details['info__attribute']}>
                <strong className={details['info__text']}>Height</strong>
                <p className={details['info__text']}>{pokemon.height * 10}cm</p>
              </div>
              <div className={details['info__attribute']}>
                <strong className={details['info__text']}>Weight</strong>
                <p className={details['info__text']}>{pokemon.weight * 0.1}kg</p>
              </div>
              <div className={details['info__attribute']}>
                <strong className={details['info__text']}>Gender</strong>
                <p className={details['info__text']}>{pokemon.gender}</p>
              </div>
            </div>
            <div className={details['info__attributes']}>
              <div className={details['info__attribute']}>
                <strong className={details['info__text']}>Abilities</strong>
                <ul>
                  {pokemon.abilities.map((item, index) =>
                    <li
                      key={item + index}
                      className={details['info__text']}
                    >
                      {item.ability.name}
                    </li>)}
                </ul>
              </div>
              <div className={details['info__attribute']}>
                <strong className={details['info__text']}>Type</strong>
                <ul>
                  {pokemon.types.map((item, index) =>
                    <li
                      key={item + index}
                      className={details['info__text']}
                    >
                      {item.type.name}
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className={styles['break-line']} />
        <div className={styles['stats']}>
          <Graphics dataset={[{ data: pokemon.stats_data }]} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(stopShow()),
    compare: () => dispatch(compare())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail)