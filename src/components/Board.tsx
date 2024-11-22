import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Square } from './Square';
import { Board, Position } from '../types/chess';

interface BoardProps {
    board: Board;
    selectedSquare: Position | null;
    onSquarePress: (position: Position) => void;
}

export const ChessBoard: React.FC<BoardProps> = ({
    board,
    selectedSquare,
    onSquarePress,
}) => (
    <View style={styles.board}>
        {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((piece, colIndex) => (
                    <Square
                        key={colIndex}
                        piece={piece}
                        position={[rowIndex, colIndex]}
                        isSelected={
                            selectedSquare?.[0] === rowIndex && selectedSquare?.[1] === colIndex
                        }
                        isLightSquare={(rowIndex + colIndex) % 2 === 0}
                        onPress={onSquarePress}
                    />
                ))}
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    board: {
        width: 320,
        height: 320,
    },
    row: {
        flexDirection: 'row',
    },
});
