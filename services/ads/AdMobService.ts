import { Platform } from 'react-native';
// Note: expo-ads-admob has compatibility issues, using mock implementation for development
// In production, you would use expo-ads-admob or react-native-google-mobile-ads

export interface AdConfig {
  bannerAdUnitId: string;
  interstitialAdUnitId: string;
  rewardedAdUnitId: string;
}

// Test Ad Unit IDs - Replace with your actual AdMob Ad Unit IDs
const AD_UNIT_IDS: AdConfig = {
  bannerAdUnitId: Platform.OS === 'ios' 
    ? 'ca-app-pub-3940256099942544/6300978111' // iOS Test Banner
    : 'ca-app-pub-3940256099942544/6300978111', // Android Test Banner
  interstitialAdUnitId: Platform.OS === 'ios'
    ? 'ca-app-pub-3940256099942544/1033173712' // iOS Test Interstitial
    : 'ca-app-pub-3940256099942544/1033173712', // Android Test Interstitial
  rewardedAdUnitId: Platform.OS === 'ios'
    ? 'ca-app-pub-3940256099942544/5224354917' // iOS Test Rewarded
    : 'ca-app-pub-3940256099942544/5224354917', // Android Test Rewarded
};

class AdMobService {
  private static instance: AdMobService;
  private isInitialized = false;
  private adConfig: AdConfig;

  private constructor() {
    this.adConfig = AD_UNIT_IDS;
  }

  public static getInstance(): AdMobService {
    if (!AdMobService.instance) {
      AdMobService.instance = new AdMobService();
    }
    return AdMobService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Mock AdMob initialization for development
      // In production, implement actual AdMob integration
      this.isInitialized = true;
      // AdMob initialized successfully (mock mode)
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  }

  public async loadInterstitialAd(): Promise<void> {
    try {
      // Mock ad loading for development
      // In production, implement actual AdMob integration
      // Interstitial ad loaded (mock)
    } catch (error) {
      console.error('Failed to load interstitial ad:', error);
    }
  }

  public async showInterstitialAd(): Promise<boolean> {
    try {
      // Mock ad showing for development
      // In production, implement actual AdMob integration
      // Interstitial ad shown (mock)
      return true;
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
      return false;
    }
  }

  public async loadRewardedAd(): Promise<void> {
    try {
      // Mock ad loading for development
      // In production, implement actual AdMob integration
      // Rewarded ad loaded (mock)
    } catch (error) {
      console.error('Failed to load rewarded ad:', error);
    }
  }

  public async showRewardedAd(): Promise<boolean> {
    try {
      // Mock ad showing for development
      // In production, implement actual AdMob integration
      // Rewarded ad shown (mock)
      return true;
    } catch (error) {
      console.error('Failed to show rewarded ad:', error);
      return false;
    }
  }

  public getBannerAdUnitId(): string {
    return this.adConfig.bannerAdUnitId;
  }

  public async preloadAds(): Promise<void> {
    await Promise.all([
      this.loadInterstitialAd(),
      this.loadRewardedAd()
    ]);
  }

  // Event handlers for rewarded ads
  public setupRewardedAdEvents(
    onRewarded: (reward: { type: string; amount: number }) => void,
    onAdClosed: () => void,
    onAdFailedToLoad: (error: any) => void
  ): void {
    // Mock event handlers for development
    // In production, implement actual AdMob event handlers
    // Rewarded ad events set up (mock)
  }

  public removeRewardedAdEventListeners(): void {
    // Mock event listener removal for development
    // In production, implement actual AdMob event listener removal
    // Rewarded ad event listeners removed (mock)
  }
}

export default AdMobService;
