import React from 'react';
import styles from '../../styles/Details.module.css';
// import { getClassNames } from '../../Utils';
import { connect } from 'react-redux';
import { stopShow } from '../../redux/actions/globalActions';
import Graphics from '../Graphics';
const PokemonDetail = (props) => {
  const { pokemon, close } = props;

  const handleClick = () => {
    close();
  }

  // TODO: Change to button
  const handleChange = () => {
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
      <hr className={styles['break-line']}/>
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
        <hr  className={styles['break-line']}/>
        <div className={styles['stats']}>
        {/* Add as many object as pokemons are */}
          <Graphics dataset={[{data: pokemon.stats_data}]}/>
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
    close: () => dispatch(stopShow()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail)