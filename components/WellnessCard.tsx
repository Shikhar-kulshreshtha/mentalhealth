import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, CircleCheck as CheckCircle2, Circle } from 'lucide-react-native';

interface WellnessCardProps {
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  onPress: () => void;
}

export function WellnessCard({
  title,
  description,
  duration,
  completed,
  onPress,
}: WellnessCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        completed && styles.completedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, completed && styles.completedText]}>
            {title}
          </Text>
          <View style={styles.statusIcon}>
            {completed ? (
              <CheckCircle2 size={24} color="#10B981" />
            ) : (
              <Circle size={24} color="#94a3b8" />
            )}
          </View>
        </View>
        
        <Text style={[styles.description, completed && styles.completedText]}>
          {description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.durationContainer}>
            <Clock size={16} color="#64748B" />
            <Text style={styles.duration}>{duration}</Text>
          </View>
          
          {completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>Completed</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
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
    borderLeftWidth: 4,
    borderLeftColor: '#e2e8f0',
  },
  completedContainer: {
    borderLeftColor: '#10B981',
    backgroundColor: '#f0fdf4',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
    marginRight: 12,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  completedText: {
    color: '#059669',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  statusIcon: {
    marginLeft: 8,
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
});