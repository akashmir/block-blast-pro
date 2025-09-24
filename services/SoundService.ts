import { Audio } from 'expo-av';
import { Platform } from 'react-native';

interface SoundConfig {
  volume: number;
  enabled: boolean;
}

class SoundService {
  private static instance: SoundService;
  private sounds: Map<string, Audio.Sound> = new Map();
  private config: SoundConfig = {
    volume: 0.7,
    enabled: true,
  };
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): SoundService {
    if (!SoundService.instance) {
      SoundService.instance = new SoundService();
    }
    return SoundService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Set audio mode for better performance
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Preload sound effects
      await this.preloadSounds();

      this.isInitialized = true;
      // Sound service initialized successfully
    } catch (error) {
      console.error('Failed to initialize sound service:', error);
    }
  }

  private async preloadSounds(): Promise<void> {
    const soundFiles = {
      'block_place': require('../assets/sounds/block_place.mp3'),
      'line_clear': require('../assets/sounds/line_clear.mp3'),
      'combo': require('../assets/sounds/combo.mp3'),
      'game_over': require('../assets/sounds/game_over.mp3'),
      'button_click': require('../assets/sounds/button_click.mp3'),
      'power_up': require('../assets/sounds/power_up.mp3'),
      'achievement': require('../assets/sounds/achievement.mp3'),
    };

    for (const [key, soundFile] of Object.entries(soundFiles)) {
      try {
        const { sound } = await Audio.Sound.createAsync(soundFile);
        this.sounds.set(key, sound);
      } catch (error) {
        // Failed to load sound (non-critical)
      }
    }
  }

  public async playSound(soundName: string): Promise<void> {
    if (!this.config.enabled || Platform.OS === 'web') return;

    try {
      const sound = this.sounds.get(soundName);
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.error(`Failed to play sound ${soundName}:`, error);
    }
  }

  public async playBlockPlace(): Promise<void> {
    await this.playSound('block_place');
  }

  public async playLineClear(): Promise<void> {
    await this.playSound('line_clear');
  }

  public async playCombo(): Promise<void> {
    await this.playSound('combo');
  }

  public async playGameOver(): Promise<void> {
    await this.playSound('game_over');
  }

  public async playButtonClick(): Promise<void> {
    await this.playSound('button_click');
  }

  public async playPowerUp(): Promise<void> {
    await this.playSound('power_up');
  }

  public async playAchievement(): Promise<void> {
    await this.playSound('achievement');
  }

  public setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(sound => {
      sound.setVolumeAsync(this.config.volume);
    });
  }

  public setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.config.enabled;
  }

  public getVolume(): number {
    return this.config.volume;
  }

  public async cleanup(): Promise<void> {
    try {
      for (const [key, sound] of this.sounds) {
        await sound.unloadAsync();
      }
      this.sounds.clear();
    } catch (error) {
      console.error('Failed to cleanup sound service:', error);
    }
  }
}

export default SoundService;
