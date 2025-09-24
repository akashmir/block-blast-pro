import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import GameService from '@/services/GameService';
import SocialService from '@/services/social/SocialService';

interface DailyChallengeProps {
  visible: boolean;
  onClose: () => void;
  onStartChallenge: () => void;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  reward: string;
  icon: string;
  completed: boolean;
  progress: number;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ 
  visible, 
  onClose, 
  onStartChallenge 
}) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (visible) {
      loadDailyChallenges();
      startTimer();
    }
  }, [visible]);

  const loadDailyChallenges = () => {
    // Generate daily challenges based on current date
    const today = new Date().toDateString();
    const challenges: Challenge[] = [
      {
        id: 'score_5000',
        title: 'Score Master',
        description: 'Score 5,000 points in a single game',
        target: 5000,
        reward: '100 Coins',
        icon: '🎯',
        completed: false,
        progress: 0,
      },
      {
        id: 'combo_5',
        title: 'Combo King',
        description: 'Achieve a 5x combo',
        target: 5,
        reward: '50 Coins',
        icon: '⚡',
        completed: false,
        progress: 0,
      },
      {
        id: 'games_3',
        title: 'Daily Player',
        description: 'Play 3 games today',
        target: 3,
        reward: '25 Coins',
        icon: '🎮',
        completed: false,
        progress: 0,
      },
    ];

    setChallenges(challenges);
  };

  const startTimer = () => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  };

  const handleStartChallenge = () => {
    onStartChallenge();
    onClose();
  };

  const getProgressPercentage = (challenge: Challenge) => {
    return Math.min((challenge.progress / challenge.target) * 100, 100);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Daily Challenge</Text>
          
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Time Remaining:</Text>
            <Text style={styles.timer}>{timeLeft}</Text>
          </View>

          <View style={styles.challengesContainer}>
            {challenges.map((challenge) => (
              <View key={challenge.id} style={styles.challengeItem}>
                <View style={styles.challengeIcon}>
                  <Text style={styles.iconText}>{challenge.icon}</Text>
                </View>
                
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${getProgressPercentage(challenge)}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {challenge.progress}/{challenge.target}
                    </Text>
                  </View>
                  
                  <Text style={styles.reward}>Reward: {challenge.reward}</Text>
                </View>
                
                <View style={styles.statusContainer}>
                  {challenge.completed ? (
                    <Text style={styles.completedText}>✓</Text>
                  ) : (
                    <Text style={styles.pendingText}>⏳</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.startButton} onPress={handleStartChallenge}>
              <Text style={styles.startButtonText}>Start Challenge</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    maxWidth: 400,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Press-Start-2P',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 10,
  },
  timerLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Press-Start-2P',
  },
  timer: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
  challengesContainer: {
    marginBottom: 20,
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
  },
  challengeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 24,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Press-Start-2P',
  },
  challengeDescription: {
    color: '#CCCCCC',
    fontSize: 12,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  progressText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
  reward: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
  statusContainer: {
    width: 30,
    alignItems: 'center',
  },
  completedText: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#FF9800',
    fontSize: 16,
  },
  buttonContainer: {
    gap: 10,
  },
  startButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
  closeButton: {
    backgroundColor: '#666666',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
});

export default DailyChallenge;
