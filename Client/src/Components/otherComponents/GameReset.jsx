import React from 'react';
import {GameState} from './GameState';

const GameReset = ({gameState,onReset}) => {
  if( gameState === GameState.inProgress){
    return;
  }
  return (

    <button className='reset-button player-button' onClick={onReset}>
      Play Again
    </button>
  )
}

export default GameReset;