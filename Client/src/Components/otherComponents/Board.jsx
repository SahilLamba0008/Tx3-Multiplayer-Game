import React from 'react'
import Tile from './Tile';
import Strike from './Strike';

const Board = ({tiles,playerTurn,strikeClass,onTileClick}) => {

  const tileComponents = [];

  // Generating board
  for (let i = 0; i < 9; i++) {
    tileComponents.push(
      <Tile
        key={i} // removed the console error : unique key needed
        value={tiles[i]}
        playerTurn={playerTurn}
        onClick={() => onTileClick(i)}
      />
    );
  };

  return (
    <div className="tile-board">  
        {tileComponents}

        {/* <Tile value={tiles[0]} playerTurn={playerTurn} onClick={()=>onTileClick(0)}/>
        <Tile value={tiles[1]} playerTurn={playerTurn} onClick={()=>onTileClick(1)}/>
        <Tile value={tiles[2]} playerTurn={playerTurn} onClick={()=>onTileClick(2)}/>
        <Tile value={tiles[3]} playerTurn={playerTurn} onClick={()=>onTileClick(3)}/>
        <Tile value={tiles[4]} playerTurn={playerTurn} onClick={()=>onTileClick(4)}/>
        <Tile value={tiles[5]} playerTurn={playerTurn} onClick={()=>onTileClick(5)}/>
        <Tile value={tiles[6]} playerTurn={playerTurn} onClick={()=>onTileClick(6)}/>
        <Tile value={tiles[7]} playerTurn={playerTurn} onClick={()=>onTileClick(7)}/>
        <Tile value={tiles[8]} playerTurn={playerTurn} onClick={()=>onTileClick(8)}/> */}

        <Strike strikeClass={strikeClass}/>
    </div>
  )
};

export default Board;
