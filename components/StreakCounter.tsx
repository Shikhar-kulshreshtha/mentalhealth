import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Flame, Calendar } from 'lucide-react-native';

interface StreakCounterProps {
  days: number;
}

export function StreakCounter({ days }: StreakCounterProps) {
  const getStreakMessage = (days: number) => {
    if (days === 0) return "Start your wellness journey today!";
    if (days === 1) return "Great start! Keep it up!";
    if (days < 7) return "Building momentum!";
    if (days < 30) return "You're on fire! 🔥";
    return "Incredible dedication! 🌟";
  };

  const getStreakColor = (days: number) => {
    if (days === 0) return '#94a3b8';
    if (days < 7) return '#F59E0B';
    if (days < 30) return '#F97316';
    return '#DC2626';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Flame size={24} color={getStreakColor(days)} />
        <Text style={styles.title}>Current Streak</Text>
      </View>
      
      <View style={styles.streakDisplay}>
        <Text style={[styles.streakNumber, { color: getStreakColor(days) }]}>
          {days}
        </Text>
        <Text style={styles.daysLabel}>
          {days === 1 ? 'day' : 'days'}
        </Text>
      </View>

      <Text style={styles.message}>{getStreakMessage(days)}</Text>

      <View style={styles.progressContainer}>
        <Calendar size={16} color="#64748B" />
        <Text style={styles.progressText}>
          Next milestone: {Math.ceil(days / 7) * 7} days
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  streakDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 12,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: '800',
    marginRight: 8,
  },
  daysLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
});