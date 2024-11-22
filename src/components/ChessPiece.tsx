import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Piece } from '../types/chess';

interface ChessPieceProps {
    piece: Piece | null;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({ piece }) => {
    if (!piece) return null;


    const symbols = {
        white: {
            pawn: '♙',
            rook: '♖',
            knight: '♘',
            bishop: '♗',
            queen: '♕',
            king: '♔',
        },
        black: {
            pawn: '♟',
            rook: '♜',
            knight: '♞',
            bishop: '♝',
            queen: '♛',
            king: '♚',
        }
    };

    return (
        <Text
            style={[
                styles.piece,
                piece.color === 'white'
                    ? styles.whitePiece
                    : styles.blackPiece
            ]}
        >
            {symbols[piece.color][piece.type]}
        </Text>
    );
};

const styles = StyleSheet.create({
    piece: {
        fontSize: 32,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    whitePiece: {
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 1)',
    },
    blackPiece: {
        color: '#000000',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
    },
});