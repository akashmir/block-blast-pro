// Note: Firebase packages have compatibility issues with Expo, using mock implementation for development
// In production, you would configure Firebase properly with expo-firebase-analytics

export interface GameEvent {
  eventName: string;
  parameters?: { [key: string]: any };
}

export interface UserProperties {
  [key: string]: string | number | boolean;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Mock analytics initialization for development
      // In production, implement actual Firebase analytics
      this.isInitialized = true;
      // Analytics initialized successfully (mock mode)
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }

  // Game-specific events
  public async logGameStart(gameMode: string): Promise<void> {
    await this.logEvent('game_start', {
      game_mode: gameMode,
      timestamp: Date.now(),
    });
  }

  public async logGameEnd(gameMode: string, score: number, duration: number): Promise<void> {
    await this.logEvent('game_end', {
      game_mode: gameMode,
      score: score,
      duration: duration,
      timestamp: Date.now(),
    });
  }

  public async logBlockPlaced(gameMode: string, blockType: string): Promise<void> {
    await this.logEvent('block_placed', {
      game_mode: gameMode,
      block_type: blockType,
      timestamp: Date.now(),
    });
  }

  public async logLineCleared(gameMode: string, linesCleared: number, combo: number): Promise<void> {
    await this.logEvent('line_cleared', {
      game_mode: gameMode,
      lines_cleared: linesCleared,
      combo: combo,
      timestamp: Date.now(),
    });
  }

  public async logPowerUpUsed(powerUpType: string): Promise<void> {
    await this.logEvent('power_up_used', {
      power_up_type: powerUpType,
      timestamp: Date.now(),
    });
  }

  public async logAdViewed(adType: 'banner' | 'interstitial' | 'rewarded'): Promise<void> {
    await this.logEvent('ad_viewed', {
      ad_type: adType,
      timestamp: Date.now(),
    });
  }

  public async logAdClicked(adType: 'banner' | 'interstitial' | 'rewarded'): Promise<void> {
    await this.logEvent('ad_clicked', {
      ad_type: adType,
      timestamp: Date.now(),
    });
  }

  public async logPurchaseInitiated(productId: string, price: number): Promise<void> {
    await this.logEvent('purchase_initiated', {
      product_id: productId,
      price: price,
      timestamp: Date.now(),
    });
  }

  public async logPurchaseCompleted(productId: string, price: number): Promise<void> {
    await this.logEvent('purchase_completed', {
      product_id: productId,
      price: price,
      timestamp: Date.now(),
    });
  }

  public async logScreenView(screenName: string): Promise<void> {
    await this.logEvent('screen_view', {
      screen_name: screenName,
      timestamp: Date.now(),
    });
  }

  public async logSessionStart(): Promise<void> {
    await this.logEvent('session_start', {
      timestamp: Date.now(),
    });
  }

  public async logSessionEnd(duration: number): Promise<void> {
    await this.logEvent('session_end', {
      duration: duration,
      timestamp: Date.now(),
    });
  }

  // Generic event logging
  public async logEvent(eventName: string, parameters?: { [key: string]: any }): Promise<void> {
    try {
      // Mock event logging for development
      // In production, implement actual Firebase analytics
      // Analytics Event logged (mock mode)
    } catch (error) {
      console.error('Failed to log event:', error);
    }
  }

  // User properties
  public async setUserProperties(properties: UserProperties): Promise<void> {
    try {
      // Mock user properties for development
      // In production, implement actual Firebase analytics
      // User Properties set (mock mode)
    } catch (error) {
      console.error('Failed to set user properties:', error);
    }
  }

  public async setUserId(userId: string): Promise<void> {
    try {
      // Mock user ID for development
      // In production, implement actual Firebase analytics
      // User ID set (mock mode)
    } catch (error) {
      console.error('Failed to set user ID:', error);
    }
  }

  // Crashlytics
  public async logError(error: Error, context?: string): Promise<void> {
    try {
      // Mock error logging for development
      // In production, implement actual Firebase Crashlytics
      console.error('Error logged:', error.message, context ? `Context: ${context}` : '');
    } catch (crashlyticsError) {
      console.error('Failed to log error to crashlytics:', crashlyticsError);
    }
  }

  public async setCustomKey(key: string, value: string | number | boolean): Promise<void> {
    try {
      // Mock custom key for development
      // In production, implement actual Firebase Crashlytics
      // Custom Key set (mock mode)
    } catch (error) {
      console.error('Failed to set custom key:', error);
    }
  }

  // Retention tracking
  public async logDailyActiveUser(): Promise<void> {
    await this.logEvent('daily_active_user', {
      date: new Date().toISOString().split('T')[0],
    });
  }

  public async logRetentionEvent(daysSinceInstall: number): Promise<void> {
    await this.logEvent('retention_event', {
      days_since_install: daysSinceInstall,
    });
  }
}

export default AnalyticsService;
