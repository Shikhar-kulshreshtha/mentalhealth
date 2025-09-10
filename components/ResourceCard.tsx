import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  onPress: () => void;
}

export function ResourceCard({
  title,
  description,
  icon,
  duration,
  difficulty,
  onPress,
}: ResourceCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#10B981';
      case 'intermediate':
        return '#F59E0B';
      case 'advanced':
        return '#EF4444';
      default:
        return '#64748B';
    }
  };

  const getDifficultyBackground = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#D1FAE5';
      case 'intermediate':
        return '#FEF3C7';
      case 'advanced':
        return '#FEE2E2';
      default:
        return '#F1F5F9';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.duration}>{duration}</Text>
        </View>
        <ChevronRight size={20} color="#94a3b8" />
      </View>
      
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.footer}>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyBackground(difficulty) },
          ]}
        >
          <Text
            style={[
              styles.difficultyText,
              { color: getDifficultyColor(difficulty) },
            ]}
          >
            {difficulty}
          </Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});