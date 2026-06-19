import type { RowContent } from '../types';
import Square from './Square';
import './Row.css';

interface RowProps {
  rowContent: RowContent;
  rowIndex: number;
}

function Row({ rowContent, rowIndex }: RowProps) {
  return (
    <div className='row'>
      {rowContent.map((square, i) => (
        <Square
          squareContent={square}
          rowIndex={rowIndex}
          colIndex={i}
          key={`row-${rowIndex},col-${i}`}
        />
      ))}
    </div>
  );
}

export default Row;
