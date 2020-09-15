import React from 'react';
import styles from '../../styles/Details.module.css';
// import { getClassNames } from '../../Utils';
import { connect } from 'react-redux';
import { compare } from '../../redux/actions/pokemonActions';
import { stopShow } from '../../redux/actions/globalActions';
const PokemonDetail = (props) => {
  const pokemon = props.pokemon;

  const handleClick = () => {
    props.close();
  }

  const handleChange = (event) => {
    props.compare(event.target.value);
  }

  return (
    <div className={styles['pokemon__details']} >
      <div className={styles['header']}>
        <div className={styles['header__info']}>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <input className={styles['search__input']} placeholder="Compare to..."
          onChange={handleChange}
          >
          </input>
        </div>
        <button className={styles['button--close']} onClick={handleClick}>x</button>
      </div>
      <hr />
      <div className={styles['details__content']}>
        <div className={styles['info']}>
          <div className={styles['info__img-container']}>
            <img
              className={styles['info__img']}
              src={(pokemon.imageUrl)}
              alt={`Pokemon ${pokemon.name}`} />
          </div>
          <div className={styles['info__content']}>
            <p className={styles['info__text']}>{pokemon.description}</p>
            <hr />
            <div className={styles['info__attributes']}>
              <div className={styles['info__attribute']}>
                <strong className={styles['info__text']}>Height</strong>
                <p className={styles['info__text']}>{pokemon.height}m</p>
              </div>
              <div className={styles['info__attribute']}>
                <strong className={styles['info__text']}>Weight</strong>
                <p className={styles['info__text']}>{pokemon.weight}kg</p>
              </div>
              <div className={styles['info__attribute']}>
                <strong className={styles['info__text']}>Gender</strong>
                <p className={styles['info__text']}>{pokemon.gender}</p>
              </div>
            </div>
            <div className={styles['info__attributes']}>
              <div className={styles['info__attribute']}>
                <strong className={styles['info__text']}>Abilities</strong>
                <ul>
                  {pokemon.abilities.map((item, index) =>
                    <li
                      key={item + index}
                      className={styles['info__text']}
                    >
                      {item.ability.name}
                    </li>)}
                </ul>
              </div>
              <div className={styles['info__attribute']}>
                <strong className={styles['info__text']}>Type</strong>
                <ul>
                  {pokemon.types.map((item, index) =>
                    <li
                      key={item + index}
                      className={styles['info__text']}
                    >
                      {item.type.name}
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles['stats']}>
          <h2>Stats</h2>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  console.log(state.pokemon);
  return {
    name: state.pokemon.nameToSearch,
    pokemon: state.pokemon.pokemonToShow,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    compare: (name) => dispatch(compare(name)),
    close: () => dispatch(stopShow()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail)