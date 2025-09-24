import { Platform } from 'react-native';
// Note: expo-in-app-purchases has compatibility issues, using mock implementation for now
// In production, you would use react-native-iap or implement native modules

export interface Product {
  productId: string;
  price: string;
  title: string;
  description: string;
  type: 'consumable' | 'non-consumable' | 'subscription';
}

export interface PurchaseResult {
  success: boolean;
  productId?: string;
  transactionId?: string;
  error?: string;
}

// Product IDs - Replace with your actual product IDs from App Store Connect / Google Play Console
const PRODUCT_IDS = {
  REMOVE_ADS: Platform.OS === 'ios' ? 'com.blockblastpro.remove_ads' : 'com.blockblastpro.remove_ads',
  POWER_UP_PACK: Platform.OS === 'ios' ? 'com.blockblastpro.power_up_pack' : 'com.blockblastpro.power_up_pack',
  PREMIUM_THEME_PACK: Platform.OS === 'ios' ? 'com.blockblastpro.premium_themes' : 'com.blockblastpro.premium_themes',
  PREMIUM_SUBSCRIPTION: Platform.OS === 'ios' ? 'com.blockblastpro.premium_monthly' : 'com.blockblastpro.premium_monthly',
};

class PurchaseService {
  private static instance: PurchaseService;
  private isInitialized = false;
  private products: Product[] = [];
  private purchasedProducts: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): PurchaseService {
    if (!PurchaseService.instance) {
      PurchaseService.instance = new PurchaseService();
    }
    return PurchaseService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Mock implementation for development
      // In production, replace with actual in-app purchase implementation
      this.products = [
        {
          productId: PRODUCT_IDS.REMOVE_ADS,
          price: '$2.99',
          title: 'Remove Ads',
          description: 'Remove all advertisements',
          type: 'non-consumable'
        },
        {
          productId: PRODUCT_IDS.POWER_UP_PACK,
          price: '$0.99',
          title: 'Power-up Pack',
          description: 'Get extra power-ups',
          type: 'consumable'
        },
        {
          productId: PRODUCT_IDS.PREMIUM_THEME_PACK,
          price: '$1.99',
          title: 'Premium Themes',
          description: 'Unlock premium themes',
          type: 'non-consumable'
        },
        {
          productId: PRODUCT_IDS.PREMIUM_SUBSCRIPTION,
          price: '$4.99/month',
          title: 'Premium Subscription',
          description: 'Unlimited power-ups and exclusive features',
          type: 'subscription'
        }
      ];

      this.isInitialized = true;
      // Purchase service initialized successfully (mock mode)
    } catch (error) {
      console.error('Failed to initialize purchase service:', error);
    }
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getProductById(productId: string): Product | undefined {
    return this.products.find(product => product.productId === productId);
  }

  public async purchaseProduct(productId: string): Promise<PurchaseResult> {
    try {
      const product = this.getProductById(productId);
      if (!product) {
        return {
          success: false,
          error: 'Product not found'
        };
      }

      // Mock purchase for development
      // In production, implement actual purchase logic
      this.purchasedProducts.add(productId);
      return {
        success: true,
        productId: productId,
        transactionId: `mock_${Date.now()}`,
      };
    } catch (error) {
      console.error('Purchase error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  public async restorePurchases(): Promise<PurchaseResult[]> {
    try {
      // Mock restore for development
      // In production, implement actual restore logic
      const results: PurchaseResult[] = [];
      
      // Simulate some previous purchases for testing
      if (this.purchasedProducts.size > 0) {
        this.purchasedProducts.forEach(productId => {
          results.push({
            success: true,
            productId: productId,
            transactionId: `restored_${Date.now()}`,
          });
        });
      }

      return results;
    } catch (error) {
      console.error('Restore purchases error:', error);
      return [{
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }];
    }
  }

  public hasPurchased(productId: string): boolean {
    return this.purchasedProducts.has(productId);
  }

  public hasRemovedAds(): boolean {
    return this.hasPurchased(PRODUCT_IDS.REMOVE_ADS);
  }

  public hasPremiumSubscription(): boolean {
    return this.hasPurchased(PRODUCT_IDS.PREMIUM_SUBSCRIPTION);
  }

  public async consumePurchase(productId: string): Promise<boolean> {
    try {
      // Mock consume for development
      // In production, implement actual consume logic
      this.purchasedProducts.delete(productId);
      return true;
    } catch (error) {
      console.error('Consume purchase error:', error);
      return false;
    }
  }

  // Convenience methods for specific products
  public async purchaseRemoveAds(): Promise<PurchaseResult> {
    return this.purchaseProduct(PRODUCT_IDS.REMOVE_ADS);
  }

  public async purchasePowerUpPack(): Promise<PurchaseResult> {
    return this.purchaseProduct(PRODUCT_IDS.POWER_UP_PACK);
  }

  public async purchasePremiumThemePack(): Promise<PurchaseResult> {
    return this.purchaseProduct(PRODUCT_IDS.PREMIUM_THEME_PACK);
  }

  public async purchasePremiumSubscription(): Promise<PurchaseResult> {
    return this.purchaseProduct(PRODUCT_IDS.PREMIUM_SUBSCRIPTION);
  }

  public async disconnect(): Promise<void> {
    try {
      // Mock disconnect for development
      // In production, implement actual disconnect logic
      // Purchase service disconnected (mock mode)
    } catch (error) {
      console.error('Failed to disconnect purchase service:', error);
    }
  }

  // Get product IDs for configuration
  public static getProductIds() {
    return PRODUCT_IDS;
  }
}

export default PurchaseService;
