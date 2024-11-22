import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ChessGame from './src/components/ChessGame';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ChessGame />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});
