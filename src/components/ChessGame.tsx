import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ChessBoard } from './Board';
import { createInitialBoard } from '../utils/boardUtils';
import {
    isValidPawnMove,
    isValidRookMove,
    isValidKnightMove,
    isValidBishopMove,
    isValidQueenMove,
    isValidKingMove,
} from '../utils/pieceMovements';
import { Board, Piece, Position, PieceColor } from '../types/chess';

export default function ChessGame() {
    const [board, setBoard] = useState<Board>(createInitialBoard());
    const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');

    const isValidMove = (
        from: Position,
        to: Position,
        piece: Piece,
        board: Board
    ): boolean => {
        const targetPiece = board[to[0]][to[1]];
        if (targetPiece?.color === piece.color) return false;

        switch (piece.type) {
            case 'pawn':
                return isValidPawnMove(from, to, piece, board);
            case 'rook':
                return isValidRookMove(from, to, board);
            case 'knight':
                return isValidKnightMove(from, to);
            case 'bishop':
                return isValidBishopMove(from, to, board);
            case 'queen':
                return isValidQueenMove(from, to, board);
            case 'king':
                return isValidKingMove(from, to);
            default:
                return false;
        }
    };

    const handleSquarePress = (position: Position) => {
        const [row, col] = position;
        const piece = board[row][col];

        if (!selectedSquare) {
            if (piece?.color === currentPlayer) {
                setSelectedSquare(position);
            }
            return;
        }

        const [selectedRow, selectedCol] = selectedSquare;
        const selectedPiece = board[selectedRow][selectedCol];

        if (selectedPiece && isValidMove(selectedSquare, position, selectedPiece, board)) {
            const newBoard = board.map(row => [...row]);
            newBoard[row][col] = selectedPiece;
            newBoard[selectedRow][selectedCol] = null;

            if (piece?.type === 'king') {
                Alert.alert(`Game Over! ${currentPlayer} wins!`);
            }

            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        }

        setSelectedSquare(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.turnIndicator}>Current Turn: {currentPlayer}</Text>
            <ChessBoard
                board={board}
                selectedSquare={selectedSquare}
                onSquarePress={handleSquarePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    turnIndicator: {
        fontSize: 20,
        marginBottom: 20,
    },
});