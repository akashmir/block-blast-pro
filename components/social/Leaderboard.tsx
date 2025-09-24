import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import SocialService, { LeaderboardEntry } from '@/services/social/SocialService';
import GameService from '@/services/GameService';

interface LeaderboardProps {
  gameMode?: string;
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ gameMode, onClose }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>(gameMode || 'all');
  const socialService = SocialService.getInstance();

  useEffect(() => {
    loadLeaderboard();
  }, [selectedMode]);

  const loadLeaderboard = () => {
    const entries = socialService.getLeaderboard(selectedMode === 'all' ? undefined : selectedMode, 20);
    setLeaderboard(entries);
  };

  const gameModes = [
    { id: 'all', name: 'All Modes' },
    { id: 'classic', name: 'Classic' },
    { id: 'chaos', name: 'Chaos' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}.`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return '#FFFFFF';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Leaderboard</Text>
        
        {/* Game Mode Selector */}
        <View style={styles.modeSelector}>
          {gameModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.modeButton,
                selectedMode === mode.id && styles.selectedModeButton
              ]}
              onPress={() => setSelectedMode(mode.id)}
            >
              <Text style={[
                styles.modeButtonText,
                selectedMode === mode.id && styles.selectedModeButtonText
              ]}>
                {mode.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Leaderboard Entries */}
        <ScrollView style={styles.leaderboardContainer}>
          {leaderboard.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No scores yet!</Text>
              <Text style={styles.emptySubtext}>Be the first to set a record!</Text>
            </View>
          ) : (
            leaderboard.map((entry, index) => (
              <View key={`${entry.playerName}-${entry.timestamp}`} style={styles.entry}>
                <View style={styles.rankContainer}>
                  <Text style={[styles.rank, { color: getRankColor(entry.rank || index + 1) }]}>
                    {getRankIcon(entry.rank || index + 1)}
                  </Text>
                </View>
                
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{entry.playerName}</Text>
                  <Text style={styles.gameMode}>{entry.gameMode}</Text>
                </View>
                
                <View style={styles.scoreContainer}>
                  <Text style={styles.score}>{entry.score.toLocaleString()}</Text>
                  <Text style={styles.date}>
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  modeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 5,
  },
  modeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedModeButton: {
    backgroundColor: '#FFD700',
  },
  modeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
  selectedModeButtonText: {
    color: 'black',
  },
  leaderboardContainer: {
    maxHeight: 400,
    marginBottom: 20,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playerName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
  gameMode: {
    color: '#CCCCCC',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
  date: {
    color: '#999999',
    fontSize: 10,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Press-Start-2P',
  },
  emptySubtext: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
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

export default Leaderboard;
