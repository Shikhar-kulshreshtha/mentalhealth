import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Clock, Zap, Plus } from 'lucide-react-native';
import { XPEntry } from '@/hooks/useXPSystem';

interface XPActivityFeedProps {
  xpEntries: XPEntry[];
  title?: string;
}

export function XPActivityFeed({ xpEntries, title = "Recent XP Activity" }: XPActivityFeedProps) {
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mood': return '#3B82F6';
      case 'activity': return '#10B981';
      case 'streak': return '#F59E0B';
      case 'achievement': return '#8B5CF6';
      case 'chat': return '#EF4444';
      default: return '#64748B';
    }
  };

  const getCategoryBackground = (category: string) => {
    switch (category) {
      case 'mood': return '#EBF4FF';
      case 'activity': return '#D1FAE5';
      case 'streak': return '#FEF3C7';
      case 'achievement': return '#F3E8FF';
      case 'chat': return '#FEE2E2';
      default: return '#F1F5F9';
    }
  };

  if (xpEntries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.emptyState}>
          <Zap size={48} color="#94a3b8" />
          <Text style={styles.emptyText}>No XP activity yet</Text>
          <Text style={styles.emptySubtext}>Complete activities to start earning XP!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.feedContainer} showsVerticalScrollIndicator={false}>
        {xpEntries.map((entry) => {
          const totalXP = entry.activity.xp + (entry.bonus || 0);
          return (
            <View key={entry.id} style={styles.entryItem}>
              <View
                style={[
                  styles.categoryDot,
                  { backgroundColor: getCategoryBackground(entry.activity.category) },
                ]}
              >
                <View
                  style={[
                    styles.categoryIndicator,
                    { backgroundColor: getCategoryColor(entry.activity.category) },
                  ]}
                />
              </View>
              
              <View style={styles.entryContent}>
                <Text style={styles.activityName}>{entry.activity.name}</Text>
                <View style={styles.entryMeta}>
                  <Clock size={12} color="#94a3b8" />
                  <Text style={styles.timestamp}>{formatTime(entry.timestamp)}</Text>
                </View>
              </View>
              
              <View style={styles.xpBadge}>
                <Plus size={12} color="#10B981" />
                <Text style={styles.xpAmount}>{totalXP}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  feedContainer: {
    maxHeight: 200,
  },
  entryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoryDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  entryContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  xpAmount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});