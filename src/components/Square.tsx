
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ChessPiece } from './ChessPiece';
import { Piece, Position } from '../types/chess';

interface SquareProps {
    piece: Piece | null;
    position: Position;
    isSelected: boolean;
    isLightSquare: boolean;
    onPress: (position: Position) => void;
}

export const Square: React.FC<SquareProps> = ({
    piece,
    position,
    isSelected,
    isLightSquare,
    onPress,
}) => (
    <TouchableOpacity
        style={[
            styles.square,
            isLightSquare ? styles.lightSquare : styles.darkSquare,
            isSelected && styles.selectedSquare,
        ]}
        onPress={() => onPress(position)}
    >
        <ChessPiece piece={piece} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    square: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightSquare: {
        backgroundColor: '#F0D9B5',
    },
    darkSquare: {
        backgroundColor: '#B58863',
    },
    selectedSquare: {
        backgroundColor: '#829769',
    },
});