import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import GameService from '@/services/GameService';
import PurchaseService from '@/services/purchases/PurchaseService';

interface PremiumFeaturesProps {
  onClose: () => void;
}

const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const gameService = GameService.getInstance();
  const purchaseService = PurchaseService.getInstance();

  const handlePurchaseRemoveAds = async () => {
    setIsLoading(true);
    try {
      const success = await gameService.purchaseRemoveAds();
      if (success) {
        Alert.alert('Success', 'Ads have been removed! Enjoy your ad-free experience.');
        onClose();
      } else {
        Alert.alert('Error', 'Failed to purchase. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchasePremium = async () => {
    setIsLoading(true);
    try {
      const success = await gameService.purchasePremiumSubscription();
      if (success) {
        Alert.alert('Success', 'Welcome to Premium! Enjoy unlimited power-ups and exclusive features.');
        onClose();
      } else {
        Alert.alert('Error', 'Failed to purchase. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestorePurchases = async () => {
    setIsLoading(true);
    try {
      const results = await purchaseService.restorePurchases();
      const successCount = results.filter(r => r.success).length;
      
      if (successCount > 0) {
        Alert.alert('Success', `Restored ${successCount} purchase(s).`);
        onClose();
      } else {
        Alert.alert('No Purchases', 'No previous purchases found to restore.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to restore purchases. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Premium Features</Text>
        
        <View style={styles.featureList}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🚫</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Remove Ads</Text>
              <Text style={styles.featureDescription}>Enjoy uninterrupted gameplay</Text>
            </View>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⚡</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Unlimited Power-Ups</Text>
              <Text style={styles.featureDescription}>Use power-ups without limits</Text>
            </View>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎨</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Premium Themes</Text>
              <Text style={styles.featureDescription}>Exclusive visual themes</Text>
            </View>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏆</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Exclusive Achievements</Text>
              <Text style={styles.featureDescription}>Special rewards for premium users</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.removeAdsButton]}
            onPress={handlePurchaseRemoveAds}
            disabled={isLoading || gameService.hasRemovedAds()}
          >
            <Text style={styles.buttonText}>
              {gameService.hasRemovedAds() ? 'Ads Removed ✓' : 'Remove Ads - $2.99'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.premiumButton]}
            onPress={handlePurchasePremium}
            disabled={isLoading || gameService.hasPremiumSubscription()}
          >
            <Text style={styles.buttonText}>
              {gameService.hasPremiumSubscription() ? 'Premium Active ✓' : 'Premium - $4.99/month'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.restoreButton]}
            onPress={handleRestorePurchases}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Restore Purchases</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
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
  },
  title: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Press-Start-2P',
  },
  featureList: {
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'Press-Start-2P',
  },
  featureDescription: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  buttonContainer: {
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  removeAdsButton: {
    backgroundColor: '#4CAF50',
  },
  premiumButton: {
    backgroundColor: '#FFD700',
  },
  restoreButton: {
    backgroundColor: '#2196F3',
  },
  closeButton: {
    backgroundColor: '#666666',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Press-Start-2P',
  },
});

export default PremiumFeatures;
