import { combineReducers } from 'redux'
import global from './globalReducer'
import pokemon from './pokemonReducer'

export default combineReducers({
  global,
  pokemon
})