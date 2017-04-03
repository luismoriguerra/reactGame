export const CHANGE_GAMESTATE = "CHANGE_GAMESTATE";
export const SET_ACTIVE_CELLS = 'SET_ACTIVE_CELLS';
export const WRONG_GUESSES = 'WRONG_GUESSES';
export const CORRECT_GUESSES = 'CORRECT_GUESSES';
export const RESET_GAME = 'RESET_GAME';
export const UPDATE_TIMER = 'UPDATE_TIMER';

export function changeGameState(gameState) {
  return {
    type: CHANGE_GAMESTATE,
    gameState
  }
}

export function setActiveCells(activeCells) {
  return {
    type: SET_ACTIVE_CELLS,
    activeCells
  }
}

export function recordWrongGuess(cellId) {
  return {
    type: WRONG_GUESSES,
    cellId
  }
}

export function recordCorrectGuess(cellId) {
  return {
    type: CORRECT_GUESSES,
    cellId
  }
}

export function resetGame() {
  return {
    type: RESET_GAME
  }
}

export function updateTimer(time) {
  return {
    type: UPDATE_TIMER,
    time
  }
}
