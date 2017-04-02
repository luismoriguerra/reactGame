import React from 'react';

const Cell = ({ id, gameState, activeCells, correctGuesses, wrongGuesses, recordGuess, showActiveCells }) =>{
  const active = function () {
    return activeCells.indexOf(id) >= 0;
  }

  const guessState = function() {
    if(correctGuesses.indexOf(id) >=0) {
      return true;
    } else if(wrongGuesses.indexOf(id) >=0 ){
      return false;
    }
  }


  const handleClick = function() {
    if(gameState === "recall" && guessState() === undefined) {

      recordGuess({
        cellId: id,
        userGuessIsCorrect: active()
      })
    }
  }
  
  let className = " cell ";

  if (showActiveCells && active()) {
    className += " active ";
  }


  className += " guess-" + guessState();

  return (
    <div className={className} onClick={handleClick}>
      {id}
    </div>
  )
}

export default Cell;
