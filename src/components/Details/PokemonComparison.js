import React from 'react';
// TODO: Separate specific css per file into Details
import styles from '../../styles/Details.module.css';
// import { getClassNames } from '../../Utils';
import { connect } from 'react-redux';
import { stopCompare } from '../../redux/actions/globalActions';
const PokemonComparison = (props) => {
  const { pokemonToShow, pokemonToCompare } = props;
  const handleClick = () => {
    props.close();
  }

  return (
    <div className={styles['pokemon__comparison']} >
      <div className={styles['header']}>
        <div className={styles['header__info']}>
          <h2>{(pokemonToShow.name).toUpperCase()}</h2>
          <h2>{(' vs. ' + pokemonToCompare.name).toUpperCase()}</h2>
        </div>
        <button className={styles['button--close']} onClick={handleClick}>x</button>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
  }
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