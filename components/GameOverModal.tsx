import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { GameModeType } from '@/hooks/useAppState';
import StylizedButton from '@/components/StylizedButton';
import { cssColors } from '@/constants/Color';

interface GameOverModalProps {
  visible: boolean;
  score: number;
  highScore: number;
  gameMode: GameModeType;
  onRestart: () => void;
  onMainMenu: () => void;
}

export function GameOverModal({ 
  visible, 
  score, 
  highScore, 
  gameMode, 
  onRestart, 
  onMainMenu 
}: GameOverModalProps) {
  const isNewRecord = score > highScore;
  const finalHighScore = Math.max(score, highScore);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Game Over!</Text>
          <Text style={styles.score}>Score: {score}</Text>
          {isNewRecord && <Text style={styles.newRecord}>🎉 New High Score! 🎉</Text>}
          <Text style={styles.highScore}>High Score: {finalHighScore}</Text>
          
          <View style={styles.buttonContainer}>
            <StylizedButton onClick={onRestart} text="Play Again" backgroundColor={cssColors.brightNiceRed} />
            <StylizedButton onClick={onMainMenu} text="Main Menu" backgroundColor={cssColors.pink} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    minWidth: 300,
    borderWidth: 2,
    borderColor: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: cssColors.brightNiceRed,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Silkscreen',
  },
  score: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Silkscreen',
  },
  newRecord: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Silkscreen',
  },
  highScore: {
    fontSize: 18,
    color: '#cccccc',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Silkscreen',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
});
