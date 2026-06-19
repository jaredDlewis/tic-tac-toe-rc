import Row from './Row';
import { useGame } from '../context/GameContext';
import './Board.css';

function Board() {
  const { boardContent } = useGame();

  return (
    <div className='board'>
      {boardContent.map((row, i) => (
        <Row rowContent={row} rowIndex={i} key={`row-${i}`} />
      ))}
    </div>
  );
}

export default Board;
