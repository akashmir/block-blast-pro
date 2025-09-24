import AdMobService from './ads/AdMobService';
import AnalyticsService from './analytics/AnalyticsService';
import PurchaseService from './purchases/PurchaseService';
import SocialService from './social/SocialService';

export interface GameStats {
  score: number;
  combo: number;
  linesCleared: number;
  blocksPlaced: number;
  gameDuration: number;
  gameMode: string;
  sessionStartTime: number;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  maxCount: number;
}

class GameService {
  private static instance: GameService;
  private isInitialized = false;
  private currentStats: GameStats | null = null;
  private powerUps: PowerUp[] = [];
  private sessionStartTime: number = 0;

  private constructor() {
    this.initializePowerUps();
  }

  public static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize all services
      await Promise.all([
        AdMobService.getInstance().initialize(),
        AnalyticsService.getInstance().initialize(),
        PurchaseService.getInstance().initialize(),
        SocialService.getInstance().initialize(),
      ]);

      // Preload ads
      await AdMobService.getInstance().preloadAds();

      // Log session start
      await AnalyticsService.getInstance().logSessionStart();
      this.sessionStartTime = Date.now();

      this.isInitialized = true;
      // Game service initialized successfully
    } catch (error) {
      console.error('Failed to initialize game service:', error);
      await AnalyticsService.getInstance().logError(error as Error, 'GameService.initialize');
    }
  }

  // Game session management
  public startGame(gameMode: string): void {
    this.currentStats = {
      score: 0,
      combo: 0,
      linesCleared: 0,
      blocksPlaced: 0,
      gameDuration: 0,
      gameMode,
      sessionStartTime: Date.now(),
    };

    AnalyticsService.getInstance().logGameStart(gameMode);
  }

  public endGame(): void {
    if (!this.currentStats) return;

    const duration = Date.now() - this.currentStats.sessionStartTime;
    this.currentStats.gameDuration = duration;

    // Log analytics
    AnalyticsService.getInstance().logGameEnd(
      this.currentStats.gameMode,
      this.currentStats.score,
      duration
    );

    // Add to leaderboard
    SocialService.getInstance().addScore(
      'Player', // In a real app, this would be the actual player name
      this.currentStats.score,
      this.currentStats.gameMode
    );

    // Show interstitial ad (if not premium)
    if (!PurchaseService.getInstance().hasRemovedAds()) {
      AdMobService.getInstance().showInterstitialAd();
    }

    this.currentStats = null;
  }

  public updateScore(score: number): void {
    if (this.currentStats) {
      this.currentStats.score = score;
    }
  }

  public updateCombo(combo: number): void {
    if (this.currentStats) {
      this.currentStats.combo = combo;
    }
  }

  public incrementLinesCleared(linesCleared: number): void {
    if (this.currentStats) {
      this.currentStats.linesCleared += linesCleared;
      AnalyticsService.getInstance().logLineCleared(
        this.currentStats.gameMode,
        linesCleared,
        this.currentStats.combo
      );
    }
  }

  public incrementBlocksPlaced(): void {
    if (this.currentStats) {
      this.currentStats.blocksPlaced++;
    }
  }

  public getCurrentStats(): GameStats | null {
    return this.currentStats;
  }

  // Power-up system
  private initializePowerUps(): void {
    this.powerUps = [
      {
        id: 'bomb',
        name: 'Bomb',
        description: 'Clear a 3x3 area',
        icon: '💣',
        count: 0,
        maxCount: 5,
      },
      {
        id: 'shuffle',
        name: 'Shuffle',
        description: 'Get new pieces',
        icon: '🔀',
        count: 0,
        maxCount: 3,
      },
      {
        id: 'undo',
        name: 'Undo',
        description: 'Undo last move',
        icon: '↩️',
        count: 0,
        maxCount: 2,
      },
    ];
  }

  public getPowerUps(): PowerUp[] {
    return this.powerUps;
  }

  public getPowerUpById(id: string): PowerUp | undefined {
    return this.powerUps.find(powerUp => powerUp.id === id);
  }

  public async usePowerUp(powerUpId: string): Promise<boolean> {
    const powerUp = this.getPowerUpById(powerUpId);
    if (!powerUp || powerUp.count <= 0) {
      return false;
    }

    // Check if user has premium subscription for unlimited power-ups
    if (PurchaseService.getInstance().hasPremiumSubscription()) {
      // Premium users get unlimited power-ups
    } else {
      powerUp.count--;
    }

    AnalyticsService.getInstance().logPowerUpUsed(powerUpId);
    return true;
  }

  public async purchasePowerUpPack(): Promise<boolean> {
    const result = await PurchaseService.getInstance().purchasePowerUpPack();
    if (result.success) {
      // Add power-ups to inventory
      this.powerUps.forEach(powerUp => {
        powerUp.count = powerUp.maxCount;
      });
      return true;
    }
    return false;
  }

  // Ad management
  public async showRewardedAdForPowerUp(): Promise<boolean> {
    return await AdMobService.getInstance().showRewardedAd();
  }

  public async showInterstitialAd(): Promise<boolean> {
    if (PurchaseService.getInstance().hasRemovedAds()) {
      return false; // Don't show ads for premium users
    }
    return await AdMobService.getInstance().showInterstitialAd();
  }

  // Social features
  public async shareScore(): Promise<boolean> {
    if (!this.currentStats) return false;
    return await SocialService.getInstance().shareScore(
      this.currentStats.score,
      this.currentStats.gameMode
    );
  }

  public async shareApp(): Promise<boolean> {
    return await SocialService.getInstance().shareApp();
  }

  public async requestStoreReview(): Promise<boolean> {
    return await SocialService.getInstance().requestStoreReview();
  }

  // Purchase management
  public async purchaseRemoveAds(): Promise<boolean> {
    const result = await PurchaseService.getInstance().purchaseRemoveAds();
    return result.success;
  }

  public async purchasePremiumSubscription(): Promise<boolean> {
    const result = await PurchaseService.getInstance().purchasePremiumSubscription();
    return result.success;
  }

  public hasRemovedAds(): boolean {
    return PurchaseService.getInstance().hasRemovedAds();
  }

  public hasPremiumSubscription(): boolean {
    return PurchaseService.getInstance().hasPremiumSubscription();
  }

  // Analytics helpers
  public async logScreenView(screenName: string): Promise<void> {
    await AnalyticsService.getInstance().logScreenView(screenName);
  }

  public async logAdViewed(adType: 'banner' | 'interstitial' | 'rewarded'): Promise<void> {
    await AnalyticsService.getInstance().logAdViewed(adType);
  }

  public async logPurchaseInitiated(productId: string, price: number): Promise<void> {
    await AnalyticsService.getInstance().logPurchaseInitiated(productId, price);
  }

  public async logPurchaseCompleted(productId: string, price: number): Promise<void> {
    await AnalyticsService.getInstance().logPurchaseCompleted(productId, price);
  }

  // Cleanup
  public async cleanup(): Promise<void> {
    try {
      await PurchaseService.getInstance().disconnect();
      AdMobService.getInstance().removeRewardedAdEventListeners();
      
      // Log session end
      const sessionDuration = Date.now() - this.sessionStartTime;
      await AnalyticsService.getInstance().logSessionEnd(sessionDuration);
    } catch (error) {
      console.error('Failed to cleanup game service:', error);
    }
  }
}

export default GameService;
