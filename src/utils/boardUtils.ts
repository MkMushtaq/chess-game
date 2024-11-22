import { Board, PieceType } from "../types/chess";

export const createInitialBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' };
    board[6][i] = { type: 'pawn', color: 'white' };
  }

  const backRowPieces: PieceType[] = [
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'
  ];

  backRowPieces.forEach((type, i) => {
    board[0][i] = { type, color: 'black' };
    board[7][i] = { type, color: 'white' };
  });

  return board;
};