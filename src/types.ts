export type Player = 'X' | 'O';

export type Winner = Player | 'stalemate' | null;

export type SquareContent = 'X' | 'O' | '';

export type RowContent = SquareContent[];

export type BoardContent = RowContent[];

export type UpdateSquareContent = (
  rowIndex: number,
  colIndex: number,
  value: Player,
) => void;

export type ResetGame = () => void;

export interface GameContextI {
  winner: Winner;
  currPlayer: Player;
  setCurrPlayer: (player: Player) => void;
  boardContent: BoardContent;
  setBoardContent: (board: BoardContent) => void;
  updateSquareContent: UpdateSquareContent;
  resetGame: ResetGame
}
