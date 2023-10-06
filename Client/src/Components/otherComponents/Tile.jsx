import React from 'react';

const Tile = ({value,playerTurn,onClick}) => {
  let hoverClass = null;
  if( value===null && playerTurn !== null){
    // x-hover
    hoverClass = `${playerTurn.toLowerCase()}-hover`;
  }
  return (
    <div className={`tile ${hoverClass}`} onClick={onClick}>
        {value}
    </div>
  )
}

export default Tile;