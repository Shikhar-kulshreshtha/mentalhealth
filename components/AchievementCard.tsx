import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Award, Target, Flame, Star, Crown, Zap, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface AchievementCardProps {
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  onPress?: () => void;
}

const iconMap = {
  Award,
  Target,
  Flame,
  Star,
  Crown,
  Zap,
  TrendingUp,
};

export function AchievementCard({
  title,
  description,
  unlocked,
  progress,
  onPress,
}: AchievementCardProps) {
  // Simple icon selection based on title keywords
  const getIcon = () => {
    if (title.toLowerCase().includes('first')) return Target;
    if (title.toLowerCase().includes('streak') || title.toLowerCase().includes('week')) return Flame;
    if (title.toLowerCase().includes('master') || title.toLowerCase().includes('mindful')) return Star;
    if (title.toLowerCase().includes('champion') || title.toLowerCase().includes('wellness')) return Crown;
    if (title.toLowerCase().includes('support') || title.toLowerCase().includes('chat')) return Zap;
    if (title.toLowerCase().includes('mood') || title.toLowerCase().includes('progress')) return TrendingUp;
    return Award;
  };

  const IconComponent = getIcon();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        unlocked ? styles.unlockedContainer : styles.lockedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <IconComponent
          size={24}
          color={unlocked ? '#3B82F6' : '#94a3b8'}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, !unlocked && styles.lockedText]}>
          {title}
        </Text>
        <Text style={[styles.description, !unlocked && styles.lockedText]}>
          {description}
        </Text>
        
        {!unlocked && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}
      </View>

      {unlocked && (
        <View style={styles.badge}>
          <Award size={16} color="#F59E0B" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minWidth: width * 0.7,
  },
  unlockedContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  lockedContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#e2e8f0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  lockedText: {
    color: '#94a3b8',
  },
  progressContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    minWidth: 30,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});