import React, { useReducer, useEffect } from "react";
import "./TicTacToe.css";
import Board from "../Board";
import { GameState } from "../GameState";
import GameOver from "../GameOver";
import GameReset from "../GameReset";
import { Link } from "react-router-dom";
import winSoundAssest from "../../../assets/sound/win.wav";
import clickSoundAssest from "../../../assets/sound/click.wav";

const winSound = new Audio(winSoundAssest);
winSound.volume = 0.4;
const clickSound = new Audio(clickSoundAssest);
clickSound.volume = 0.7;

// import axios from 'axios';
// import io from "socket.io-client";

// const ENDPOINT = "http://localhost:8080";
// var socket;

const player_x = "X";
const player_o = "O";

// Inital State : Starting State of Game
const initialState = {
  tiles: Array(9).fill(null),
  playerTurn: null, //next turn decider
  gameState: GameState.inProgress, //Initial Game State
  strike: null,
  buttonClicked: false, //First Turn Deciding button
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TILES":
      return { ...state, tiles: action.payload };
    case "SET_PLAYER_TURN":
      return { ...state, playerTurn: action.payload };
    case "SET_STRIKE":
      return { ...state, strike: action.payload };
    case "SET_GAME_STATE":
      return { ...state, gameState: action.payload };
    case "SET_TURN_BUTTON_CLICKED":
      return { ...state, buttonClicked: action.payload };
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [roomId, setRoomId] = useState('');
  // const [roomFull, setRoomFull] = useState(false);

  // Function to create a room
  // const createRoom = () => {
  //   socket.emit('createRoom', roomId);
  // };

  // Function to join a room
  // const joinRoom = () => {
  //   socket.emit('joinRoom', roomId);
  // };

  // ********* API's =========================================*/
  // const fetchData = async ()=>{
  //   const {data} = await axios.get('http://localhost:8080/api/data');
  //   console.log(data);
  // }

  useEffect(() => {
    // fetchData();
  }, []);

  // *** Scoket
  // useEffect(()=>{
  //   socket = io(ENDPOINT);

  // Handle room full event
  // socket.on('roomFull', () => {
  //   setRoomFull(true);
  // });

  // Cleanup event listener when component unmounts
  //   return () => {
  //     socket.off('roomFull');
  //   };
  // },[]);

  //********** API's end ======================================*/

  // CHECK WINNER FUNCTION WITH USE EFFECT HOOK
  const winCombos = [
    // Rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },

    // Columns
    { combo: [0, 3, 6], strikeClass: "strike-col-1" },
    { combo: [1, 4, 7], strikeClass: "strike-col-2" },
    { combo: [2, 5, 8], strikeClass: "strike-col-3" },

    // Diagonals
    { combo: [0, 4, 8], strikeClass: "strike-diag-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diag-2" },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function checkWinner() {
    for (const { combo, strikeClass } of winCombos) {
      const tileVal1 = state.tiles[combo[0]];
      const tileVal2 = state.tiles[combo[1]];
      const tileVal3 = state.tiles[combo[2]];

      if (tileVal1 !== null && tileVal1 === tileVal2 && tileVal2 === tileVal3) {
        dispatch({ type: "SET_STRIKE", payload: strikeClass });
        console.log(strikeClass);

        // Decide Winner and Set - Game State according to winner
        if (tileVal1 === player_x) {
          dispatch({ type: "SET_GAME_STATE", payload: GameState.xWins });
        } else {
          dispatch({ type: "SET_GAME_STATE", payload: GameState.oWins });
        }
        return; // return so it won't go till draw state if winner is already decided
      }
    }

    // Draw State
    const checkFilledTiles = state.tiles.every((tile) => tile !== null);
    if (checkFilledTiles) {
      dispatch({ type: "SET_GAME_STATE", payload: GameState.draw });
    }
    // console.log(state.tiles);
  }

  useEffect(() => {
    // checkWinner();
    if (state.gameState === GameState.inProgress) {
      checkWinner();
    }

    if(state.tiles.some((tile)=> tile !== null)){
      clickSound.play();
    }
  }, [checkWinner, state.gameState, state.tiles]);

  useEffect(()=>{
    if( state.gameState !== GameState.inProgress ){
      winSound.play();
    }
  },[state.gameState]);

  const handleTileClick = (index) => {
    // sendGameStateToServer();
    // ******* Can't fill tiles if game is not in Progress state
    if (state.gameState !== GameState.inProgress) {
      return;
    }

    const newTiles = [...state.tiles];
    newTiles[index] = state.playerTurn;
    // ******* Handling Duplicate Responses
    if (state.tiles[index] !== null) {
      return;
    } else {
      dispatch({ type: "SET_TILES", payload: newTiles });
    }

    // ******* When Player clicks without choosing who will have 1st turn
    if (state.playerTurn === null) {
      alert("Please Select the Starting Player Value");
    } else {
      const nextPlayer = state.playerTurn === player_x ? player_o : player_x;
      dispatch({ type: "SET_PLAYER_TURN", payload: nextPlayer });
    }
  };

  const handleTurnButtonClick = (firstPlayer) => {
    dispatch({ type: "SET_PLAYER_TURN", payload: firstPlayer });
    dispatch({ type: "SET_TURN_BUTTON_CLICKED", payload: true });
    // console.log(firstPlayer);
  };

  const handelResetButtonClick = () => {
    const resetBoard = Array(9).fill(null);
    dispatch({ type: "SET_TILES", payload: resetBoard });
    dispatch({ type: "SET_GAME_STATE", payload: GameState.inProgress });
    dispatch({ type: "SET_STRIKE", payload: null });
    dispatch({ type: "SET_TURN_BUTTON_CLICKED", payload: false });
    dispatch({ type: "SET_PLAYER_TURN", payload: null });
  };

  return (
    <>
      <div className="tictactoe-container">
      <div className="navbar">
        <div className="left"><h4>tic-tac-toe</h4></div>
        <Link to='/'>
        <div className="right"><button>Home</button></div>
        </Link>
      </div>
      <h1>TicTacToe</h1>
      <div className="game-board">
      <Board
        tiles={state.tiles}
        playerTurn={state.playerTurn}
        strikeClass={state.strike}
        onTileClick={handleTileClick}
      />
      <GameOver gameState={state.gameState} />
      <GameReset gameState={state.gameState} onReset={handelResetButtonClick} />

      {state.gameState !== GameState.inProgress && state.buttonClicked ? (
        <div className="turn-player">
          <div className="turn-indicator">
            <p>Turn </p>
            <div className="turn-indicator-state">{state.playerTurn}</div>
          </div>
          <button className="player-button" onClick={handelResetButtonClick}>
            Reset Game
          </button>
        </div>
      ) : (
        <div className="starting-player">
          <h2>Who will Play First ?</h2>
          <div className="buttons">
            <button className="player-button" onClick={() => handleTurnButtonClick(player_x)}>
              Player X
            </button>
            <button className="player-button" onClick={() => handleTurnButtonClick(player_o)}>
              Player O
            </button>
          </div>
        </div>
      )}

      </div>
      </div>
    </>
  );
};

export default TicTacToe;
