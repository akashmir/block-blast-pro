import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// Note: expo-ads-admob has compatibility issues, using mock implementation for development
import AdMobService from '@/services/ads/AdMobService';
import GameService from '@/services/GameService';

interface BannerAdProps {
  style?: any;
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: any) => void;
}

const BannerAd: React.FC<BannerAdProps> = ({ 
  style, 
  onAdLoaded, 
  onAdFailedToLoad 
}) => {
  const gameService = GameService.getInstance();

  const handleAdLoaded = () => {
    gameService.logAdViewed('banner');
    onAdLoaded?.();
  };

  const handleAdFailedToLoad = (error: any) => {
    // Banner ad failed to load (non-critical for mock mode)
    onAdFailedToLoad?.(error);
  };

  // Don't show ads if user has removed ads
  if (gameService.hasRemovedAds()) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.mockBanner}>
        <Text style={styles.mockBannerText}>Mock Banner Ad</Text>
        <Text style={styles.mockBannerSubtext}>Development Mode</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    alignSelf: 'center',
  },
  mockBanner: {
    width: 320,
    height: 50,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#666666',
  },
  mockBannerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mockBannerSubtext: {
    color: '#CCCCCC',
    fontSize: 10,
  },
});

export default BannerAd;
