import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PowerUp } from '@/services/GameService';
import GameService from '@/services/GameService';

interface PowerUpPanelProps {
  onPowerUpUsed: (powerUpId: string) => void;
}

const PowerUpPanel: React.FC<PowerUpPanelProps> = ({ onPowerUpUsed }) => {
  const gameService = GameService.getInstance();
  const powerUps = gameService.getPowerUps();

  const handlePowerUpPress = async (powerUpId: string) => {
    const powerUp = gameService.getPowerUpById(powerUpId);
    if (!powerUp || powerUp.count <= 0) {
      // Show rewarded ad for power-up
      const adShown = await gameService.showRewardedAdForPowerUp();
      if (adShown && powerUp) {
        // Add power-up after watching ad
        powerUp.count = Math.min(powerUp.count + 1, powerUp.maxCount);
      }
      return;
    }

    const success = await gameService.usePowerUp(powerUpId);
    if (success) {
      onPowerUpUsed(powerUpId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Power-Ups</Text>
      <View style={styles.powerUpsContainer}>
        {powerUps.map((powerUp) => (
          <TouchableOpacity
            key={powerUp.id}
            style={[
              styles.powerUpButton,
              powerUp.count <= 0 && styles.disabledButton
            ]}
            onPress={() => handlePowerUpPress(powerUp.id)}
            disabled={powerUp.count <= 0 && !gameService.hasPremiumSubscription()}
          >
            <Text style={styles.powerUpIcon}>{powerUp.icon}</Text>
            <Text style={styles.powerUpName}>{powerUp.name}</Text>
            <Text style={styles.powerUpCount}>{powerUp.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Press-Start-2P',
  },
  powerUpsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  powerUpButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 10,
    minWidth: 80,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  disabledButton: {
    opacity: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  powerUpIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  powerUpName: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
    fontFamily: 'Press-Start-2P',
  },
  powerUpCount: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
});

export default PowerUpPanel;
