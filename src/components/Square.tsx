import { useGame } from '../context/GameContext';
import type { SquareContent } from '../types';
import './Square.css';

interface SquareProps {
  squareContent: SquareContent;
  rowIndex: number;
  colIndex: number;
}

function Square({ squareContent, rowIndex, colIndex }: SquareProps) {
  const { winner, currPlayer, updateSquareContent } = useGame();
  const handleClick = () => {
    // protect against:
    // - updating squares with existing values
    // - clicking after a player has already won
    if (squareContent === '' && winner === null) {
      updateSquareContent(rowIndex, colIndex, currPlayer);
    }
  };
  return (
    <div className='square' onClick={handleClick}>
      {squareContent}
    </div>
  );
}

export default Square;
