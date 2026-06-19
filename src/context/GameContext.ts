import { createContext, useContext, useState } from 'react';
import type {
  GameContextI,
  Winner,
  BoardContent,
  Player,
  UpdateSquareContent,
  ResetGame,
} from '../types';
import {
  INITIAL_BOARD_CONTENT,
  INITIAL_CURR_PLAYER,
  INITIAL_WINNER,
  WINNING_CONDITIONS,
} from '../constants/gameConstants';

export const GameContext = createContext<GameContextI | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

const checkForWinner = (player: Player, newBoard: BoardContent): Winner => {
  // Check all winning conditions
  winningConditionsLoop: for (const winningBoard of WINNING_CONDITIONS) {
    // Check if the squares required for winning are occupied by the player
    for (let row = 0; row < winningBoard.length; row++) {
      for (let col = 0; col < winningBoard[row].length; col++) {
        // if the row, column of the winningBoard is 'X', the currBoard square must be the player If not, continue to next winning board
        if (winningBoard[row][col] === 'X' && newBoard[row][col] !== player) {
          continue winningConditionsLoop;
        }
      }
    }
    // if we iterated through all the squares in the winning board without continuing, the currPlayer is the winner
    return player;
  }

  // If there there are empty squares left (''), there is no winner yet.
  for (const row of newBoard) {
    for (const square of row) {
      if (square === '') return null;
    }
  }

  return 'stalemate';
};

export function useGameStateManagement() {
  const [currPlayer, setCurrPlayer] = useState<Player>(INITIAL_CURR_PLAYER);
  const [winner, setWinner] = useState<Winner>(INITIAL_WINNER);
  const [boardContent, setBoardContent] = useState<BoardContent>(
    INITIAL_BOARD_CONTENT,
  );

  const updateSquareContent: UpdateSquareContent = (
    rowIndex,
    colIndex,
    value,
  ) => {
    // generate deep copy of boardContent
    const newBoardContent = boardContent.map((row) =>
      row.map((square) => square),
    );
    // update specified square value
    newBoardContent[rowIndex][colIndex] = value;
    const winner = checkForWinner(value, newBoardContent);
    if (winner) {
      setWinner(winner);
    }
    setBoardContent(newBoardContent);
    const nextPlayer = currPlayer === 'X' ? 'O' : 'X';
    setCurrPlayer(nextPlayer);
  };

  const resetGame: ResetGame = () => {
    setCurrPlayer(INITIAL_CURR_PLAYER);
    setWinner(INITIAL_WINNER);
    setBoardContent(INITIAL_BOARD_CONTENT);
  };

  return {
    winner,
    currPlayer,
    setCurrPlayer,
    boardContent,
    setBoardContent,
    updateSquareContent,
    resetGame,
  };
}
