import { combineReducers } from 'redux';
import {
  ACTION_TEST,
  CHANGE_GAMESTATE,
  SET_ACTIVE_CELLS,
  WRONG_GUESSES,
  CORRECT_GUESSES,
  UPDATE_TIMER,
  RESET_GAME } from './actions'; // keys


function testReducer(state = '', action) {
    switch (action.type) {
      case ACTION_TEST:
        return action.text;
      default:
        return state;
    }
}

function gameState( state = 'ready', action) {
  switch (action.type) {
  case CHANGE_GAMESTATE:
    return action.gameState
    case RESET_GAME:
        return 'ready';
  default:
    return state;
  }
}

function activeCells(state = [], action) {
  switch (action.type) {
  case SET_ACTIVE_CELLS:
    return action.activeCells;
  case RESET_GAME:
      return [];
  default:
    return state;
  }
}

function wrongGuesses(state = [], action) {
  switch (action.type) {
  case WRONG_GUESSES:
    return [ ...state, action.cellId];
  case RESET_GAME:
      return [];
  default:
    return state;
  }
}

function correctGuesses(state = [], action) {
  switch (action.type) {
  case CORRECT_GUESSES:
    return [ ...state, action.cellId];
  case RESET_GAME:
      return [];
  default:
    return state;
  }
}

function gameNumber(state = 1, action) {
  switch (action.type) {
  case RESET_GAME:
    return ++state;
  default:
    return state;
  }
}

function timer(state = 0 , action) {
  switch (action.type) {
  case UPDATE_TIMER:
    return action.time;
  default:
    return state;
  }
}

const rootReducer  = combineReducers({
  gameState,
  activeCells,
  wrongGuesses,
  correctGuesses,
  gameNumber,
  timer
})

export default rootReducer;
