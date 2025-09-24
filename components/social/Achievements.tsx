import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import SocialService, { Achievement } from '@/services/social/SocialService';

interface AchievementsProps {
  onClose: () => void;
}

const Achievements: React.FC<AchievementsProps> = ({ onClose }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const socialService = SocialService.getInstance();

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    const allAchievements = socialService.getAchievements();
    setAchievements(allAchievements);
  };

  const getFilteredAchievements = () => {
    switch (selectedFilter) {
      case 'unlocked':
        return achievements.filter(achievement => achievement.unlocked);
      case 'locked':
        return achievements.filter(achievement => !achievement.unlocked);
      default:
        return achievements;
    }
  };

  const getProgressPercentage = (achievement: Achievement) => {
    if (!achievement.maxProgress || achievement.maxProgress === 0) return 0;
    return Math.min((achievement.progress || 0) / achievement.maxProgress, 1);
  };

  const formatProgress = (achievement: Achievement) => {
    if (achievement.unlocked) return 'Completed';
    if (achievement.maxProgress && achievement.maxProgress > 0) {
      return `${achievement.progress || 0}/${achievement.maxProgress}`;
    }
    return 'In Progress';
  };

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'unlocked', name: 'Unlocked' },
    { id: 'locked', name: 'Locked' },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Achievements</Text>
        
        {/* Progress Summary */}
        <View style={styles.progressSummary}>
          <Text style={styles.progressText}>
            {unlockedCount}/{totalCount} Achievements Unlocked
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(unlockedCount / totalCount) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedFilter(filter.id as any)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === filter.id && styles.selectedFilterButtonText
              ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievements List */}
        <ScrollView style={styles.achievementsContainer}>
          {getFilteredAchievements().map((achievement) => (
            <View 
              key={achievement.id} 
              style={[
                styles.achievementItem,
                achievement.unlocked && styles.unlockedAchievement
              ]}
            >
              <View style={styles.achievementIcon}>
                <Text style={[
                  styles.iconText,
                  !achievement.unlocked && styles.lockedIcon
                ]}>
                  {achievement.icon}
                </Text>
              </View>
              
              <View style={styles.achievementInfo}>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.description}
                </Text>
                
                {/* Progress Bar for Locked Achievements */}
                {!achievement.unlocked && achievement.maxProgress && achievement.maxProgress > 0 && (
                  <View style={styles.achievementProgress}>
                    <View style={styles.achievementProgressBar}>
                      <View 
                        style={[
                          styles.achievementProgressFill,
                          { width: `${getProgressPercentage(achievement) * 100}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {formatProgress(achievement)}
                    </Text>
                  </View>
                )}
                
                {achievement.unlocked && achievement.unlockedAt && (
                  <Text style={styles.unlockedDate}>
                    Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>
          ))}
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
  progressSummary: {
    marginBottom: 20,
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Press-Start-2P',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 5,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#FFD700',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
  selectedFilterButtonText: {
    color: 'black',
  },
  achievementsContainer: {
    maxHeight: 400,
    marginBottom: 20,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    opacity: 0.6,
  },
  unlockedAchievement: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderWidth: 2,
    borderColor: '#FFD700',
    opacity: 1,
  },
  achievementIcon: {
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
  lockedIcon: {
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Press-Start-2P',
  },
  achievementDescription: {
    color: '#CCCCCC',
    fontSize: 12,
    marginBottom: 10,
  },
  lockedText: {
    color: '#666666',
  },
  achievementProgress: {
    marginTop: 5,
  },
  achievementProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 5,
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  unlockedDate: {
    color: '#FFD700',
    fontSize: 10,
    fontStyle: 'italic',
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

export default Achievements;
