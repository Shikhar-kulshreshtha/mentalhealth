import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Flame, Target, Award, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  color: string;
}

export function StatCard({ title, value, description, color }: StatCardProps) {
  const getIcon = () => {
    if (title.toLowerCase().includes('streak')) return Flame;
    if (title.toLowerCase().includes('sessions') || title.toLowerCase().includes('total')) return Target;
    if (title.toLowerCase().includes('achievements') || title.toLowerCase().includes('badges')) return Award;
    if (title.toLowerCase().includes('mood') || title.toLowerCase().includes('score')) return TrendingUp;
    return Target;
  };

  const IconComponent = getIcon();

  return (
    <View style={[styles.container, { width: (width - 60) / 2 }]}>
      <View style={styles.iconContainer}>
        <IconComponent size={24} color={color} />
      </View>
      
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
  },
});