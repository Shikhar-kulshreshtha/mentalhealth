import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star, Zap } from 'lucide-react-native';
import { UserLevel } from '@/hooks/useXPSystem';

interface XPProgressBarProps {
  userLevel: UserLevel;
  showDetails?: boolean;
}

export function XPProgressBar({ userLevel, showDetails = true }: XPProgressBarProps) {
  const progressPercentage = (userLevel.currentXP / (userLevel.currentXP + userLevel.xpToNextLevel)) * 100;

  return (
    <View style={styles.container}>
      {showDetails && (
        <View style={styles.header}>
          <View style={styles.levelInfo}>
            <View style={styles.levelBadge}>
              <Star size={16} color="#F59E0B" />
              <Text style={styles.levelText}>Level {userLevel.level}</Text>
            </View>
            <Text style={styles.titleText}>{userLevel.title}</Text>
          </View>
          <View style={styles.xpInfo}>
            <Zap size={16} color="#3B82F6" />
            <Text style={styles.xpText}>{userLevel.totalXP} XP</Text>
          </View>
        </View>
      )}
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progressPercentage}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {userLevel.currentXP}/{userLevel.currentXP + userLevel.xpToNextLevel} XP
        </Text>
      </View>
      
      {showDetails && (
        <Text style={styles.nextLevelText}>
          {userLevel.xpToNextLevel} XP to Level {userLevel.level + 1}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelInfo: {
    flex: 1,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  levelText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  titleText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  xpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  xpText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B82F6',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    minWidth: 60,
  },
  nextLevelText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    fontWeight: '500',
  },
});