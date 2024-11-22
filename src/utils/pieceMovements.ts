import { Position, Board, PieceType, Piece } from "../types/chess";

export const isValidPawnMove = (
  from: Position,
  to: Position,
  piece: Piece,
  board: Board
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const direction = piece.color === 'white' ? -1 : 1;
  const startingRow = piece.color === 'white' ? 6 : 1;

  if (fromCol === toCol && !board[toRow][toCol]) {
    if (toRow === fromRow + direction) return true;
    if (fromRow === startingRow && 
        toRow === fromRow + 2 * direction && 
        !board[fromRow + direction][fromCol]) {
      return true;
    }
  }

  if (Math.abs(toCol - fromCol) === 1 && 
      toRow === fromRow + direction && 
      board[toRow][toCol]?.color !== piece.color) {
    return true;
  }

  return false;
};

export const isValidRookMove = (
  from: Position,
  to: Position,
  board: Board
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  if (fromRow !== toRow && fromCol !== toCol) return false;

  const rowDirection = Math.sign(toRow - fromRow);
  const colDirection = Math.sign(toCol - fromCol);

  let currentRow = fromRow + rowDirection;
  let currentCol = fromCol + colDirection;

  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol]) return false;
    currentRow += rowDirection;
    currentCol += colDirection;
  }

  return true;
};

export const isValidKnightMove = (
  from: Position,
  to: Position
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

export const isValidBishopMove = (
  from: Position,
  to: Position,
  board: Board
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) return false;

  const rowDirection = Math.sign(toRow - fromRow);
  const colDirection = Math.sign(toCol - fromCol);

  let currentRow = fromRow + rowDirection;
  let currentCol = fromCol + colDirection;

  while (currentRow !== toRow && currentCol !== toCol) {
    if (board[currentRow][currentCol]) return false;
    currentRow += rowDirection;
    currentCol += colDirection;
  }

  return true;
};

export const isValidQueenMove = (
  from: Position,
  to: Position,
  board: Board
): boolean => {
  return isValidRookMove(from, to, board) || isValidBishopMove(from, to, board);
};

export const isValidKingMove = (
  from: Position,
  to: Position
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  return Math.abs(toRow - fromRow) <= 1 && Math.abs(toCol - fromCol) <= 1;
};
