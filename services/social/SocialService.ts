// Note: expo-sharing and expo-store-review have compatibility issues, using mock implementations for development
import { Platform } from 'react-native';

export interface LeaderboardEntry {
  playerName: string;
  score: number;
  gameMode: string;
  timestamp: number;
  rank?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  progress?: number;
  maxProgress?: number;
}

class SocialService {
  private static instance: SocialService;
  private leaderboard: LeaderboardEntry[] = [];
  private achievements: Achievement[] = [];
  private isInitialized = false;

  private constructor() {
    this.initializeAchievements();
  }

  public static getInstance(): SocialService {
    if (!SocialService.instance) {
      SocialService.instance = new SocialService();
    }
    return SocialService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load saved data from AsyncStorage
      await this.loadLeaderboard();
      await this.loadAchievements();
      
      this.isInitialized = true;
      // Social service initialized successfully
    } catch (error) {
      console.error('Failed to initialize social service:', error);
    }
  }

  // Leaderboard functionality
  public async addScore(playerName: string, score: number, gameMode: string): Promise<void> {
    const entry: LeaderboardEntry = {
      playerName,
      score,
      gameMode,
      timestamp: Date.now(),
    };

    this.leaderboard.push(entry);
    this.leaderboard.sort((a, b) => b.score - a.score);
    
    // Keep only top 100 scores
    if (this.leaderboard.length > 100) {
      this.leaderboard = this.leaderboard.slice(0, 100);
    }

    // Update ranks
    this.leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    await this.saveLeaderboard();
    await this.checkAchievements(score, gameMode);
  }

  public getLeaderboard(gameMode?: string, limit: number = 10): LeaderboardEntry[] {
    let filteredLeaderboard = gameMode 
      ? this.leaderboard.filter(entry => entry.gameMode === gameMode)
      : this.leaderboard;

    return filteredLeaderboard.slice(0, limit);
  }

  public getPlayerRank(playerName: string, gameMode?: string): number {
    const leaderboard = gameMode 
      ? this.leaderboard.filter(entry => entry.gameMode === gameMode)
      : this.leaderboard;

    const playerEntry = leaderboard.find(entry => entry.playerName === playerName);
    return playerEntry ? playerEntry.rank || 0 : 0;
  }

  // Achievement system
  private initializeAchievements(): void {
    this.achievements = [
      {
        id: 'first_game',
        title: 'First Steps',
        description: 'Complete your first game',
        icon: '🎮',
        unlocked: false,
        progress: 0,
        maxProgress: 1,
      },
      {
        id: 'score_1000',
        title: 'Getting Started',
        description: 'Score 1,000 points in a single game',
        icon: '⭐',
        unlocked: false,
        progress: 0,
        maxProgress: 1000,
      },
      {
        id: 'score_5000',
        title: 'Rising Star',
        description: 'Score 5,000 points in a single game',
        icon: '🌟',
        unlocked: false,
        progress: 0,
        maxProgress: 5000,
      },
      {
        id: 'score_10000',
        title: 'Block Master',
        description: 'Score 10,000 points in a single game',
        icon: '👑',
        unlocked: false,
        progress: 0,
        maxProgress: 10000,
      },
      {
        id: 'games_played_10',
        title: 'Dedicated Player',
        description: 'Play 10 games',
        icon: '🎯',
        unlocked: false,
        progress: 0,
        maxProgress: 10,
      },
      {
        id: 'games_played_50',
        title: 'Block Enthusiast',
        description: 'Play 50 games',
        icon: '🔥',
        unlocked: false,
        progress: 0,
        maxProgress: 50,
      },
      {
        id: 'games_played_100',
        title: 'Block Addict',
        description: 'Play 100 games',
        icon: '💎',
        unlocked: false,
        progress: 0,
        maxProgress: 100,
      },
      {
        id: 'combo_5',
        title: 'Combo Master',
        description: 'Achieve a 5x combo',
        icon: '⚡',
        unlocked: false,
        progress: 0,
        maxProgress: 5,
      },
      {
        id: 'combo_10',
        title: 'Combo Legend',
        description: 'Achieve a 10x combo',
        icon: '💥',
        unlocked: false,
        progress: 0,
        maxProgress: 10,
      },
    ];
  }

  public async checkAchievements(score: number, gameMode: string): Promise<Achievement[]> {
    const newlyUnlocked: Achievement[] = [];

    for (const achievement of this.achievements) {
      if (achievement.unlocked) continue;

      let shouldUnlock = false;
      let newProgress = achievement.progress || 0;

      switch (achievement.id) {
        case 'first_game':
          newProgress = 1;
          shouldUnlock = true;
          break;
        case 'score_1000':
        case 'score_5000':
        case 'score_10000':
          newProgress = Math.max(newProgress, score);
          shouldUnlock = newProgress >= (achievement.maxProgress || 0);
          break;
        case 'games_played_10':
        case 'games_played_50':
        case 'games_played_100':
          newProgress += 1;
          shouldUnlock = newProgress >= (achievement.maxProgress || 0);
          break;
      }

      achievement.progress = newProgress;
      
      if (shouldUnlock && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.unlockedAt = Date.now();
        newlyUnlocked.push(achievement);
      }
    }

    if (newlyUnlocked.length > 0) {
      await this.saveAchievements();
    }

    return newlyUnlocked;
  }

  public getAchievements(): Achievement[] {
    return this.achievements;
  }

  public getUnlockedAchievements(): Achievement[] {
    return this.achievements.filter(achievement => achievement.unlocked);
  }

  public getAchievementById(id: string): Achievement | undefined {
    return this.achievements.find(achievement => achievement.id === id);
  }

  // Social sharing
  public async shareScore(score: number, gameMode: string): Promise<boolean> {
    try {
      const shareText = `🎮 I just scored ${score.toLocaleString()} points in Block Blast Pro! Can you beat my score? Download the game now! #BlockBlastPro`;
      
      // Mock sharing for development
      // In production, implement actual sharing functionality
      // Share text prepared
      
      if (Platform.OS === 'web') {
        // For web, copy to clipboard
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
          return true;
        }
      }
      
      // Mock successful sharing
      return true;
    } catch (error) {
      console.error('Failed to share score:', error);
      return false;
    }
  }

  public async shareApp(): Promise<boolean> {
    try {
      const shareText = `🎮 Check out Block Blast Pro - the most addictive block puzzle game! Download now and challenge your friends! #BlockBlastPro`;
      
      // Mock sharing for development
      // In production, implement actual sharing functionality
      // Share app text prepared
      
      if (Platform.OS === 'web') {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
          return true;
        }
      }
      
      // Mock successful sharing
      return true;
    } catch (error) {
      console.error('Failed to share app:', error);
      return false;
    }
  }

  // Store review
  public async requestStoreReview(): Promise<boolean> {
    try {
      // Mock store review for development
      // In production, implement actual store review functionality
      // Store review requested (mock)
      return true;
    } catch (error) {
      console.error('Failed to request store review:', error);
      return false;
    }
  }

  public async hasRequestedReview(): Promise<boolean> {
    try {
      // Mock review status check for development
      // In production, implement actual review status check
      return false;
    } catch (error) {
      console.error('Failed to check review status:', error);
      return false;
    }
  }

  // Data persistence
  private async loadLeaderboard(): Promise<void> {
    // Implementation would load from AsyncStorage
    // For now, we'll use in-memory storage
  }

  private async saveLeaderboard(): Promise<void> {
    // Implementation would save to AsyncStorage
    // For now, we'll use in-memory storage
  }

  private async loadAchievements(): Promise<void> {
    // Implementation would load from AsyncStorage
    // For now, we'll use in-memory storage
  }

  private async saveAchievements(): Promise<void> {
    // Implementation would save to AsyncStorage
    // For now, we'll use in-memory storage
  }
}

export default SocialService;
