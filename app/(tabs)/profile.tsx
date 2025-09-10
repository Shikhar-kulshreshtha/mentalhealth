import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Award, Calendar, Target, TrendingUp, Settings, User, Crown, Star, Zap, CreditCard as Edit3, Trophy } from 'lucide-react-native';
import { AchievementCard } from '@/components/AchievementCard';
import { StatCard } from '@/components/StatCard';

const { width } = Dimensions.get('window');

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState<'stats' | 'achievements' | 'history'>('stats');

  const userStats = [
    {
      id: '1',
      title: 'Current Streak',
      value: '7 days',
      description: 'Daily check-ins',
      color: '#F97316',
    },
    {
      id: '2',
      title: 'Total Sessions',
      value: '42',
      description: 'Wellness activities',
      color: '#10B981',
    },
    {
      id: '3',
      title: 'Achievements',
      value: '8/15',
      description: 'Badges earned',
      color: '#8B5CF6',
    },
    {
      id: '4',
      title: 'Mood Score',
      value: '8.2/10',
      description: 'Average this week',
      color: '#3B82F6',
    },
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first mood check-in',
      unlocked: true,
      progress: 100,
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintained a 7-day streak',
      unlocked: true,
      progress: 100,
    },
    {
      id: '3',
      title: 'Mindful Master',
      description: 'Complete 30 meditation sessions',
      unlocked: false,
      progress: 60,
    },
    {
      id: '4',
      title: 'Mood Explorer',
      description: 'Track mood for 14 consecutive days',
      unlocked: false,
      progress: 50,
    },
    {
      id: '5',
      title: 'Wellness Champion',
      description: 'Complete 100 wellness activities',
      unlocked: false,
      progress: 42,
    },
    {
      id: '6',
      title: 'Support Seeker',
      description: 'Have 20 conversations with AI companion',
      unlocked: false,
      progress: 85,
    },
    {
      id: '7',
      title: 'Resource Scholar',
      description: 'Read 15 mental health articles',
      unlocked: false,
      progress: 73,
    },
    {
      id: '8',
      title: 'Streak Master',
      description: 'Maintain a 30-day streak',
      unlocked: false,
      progress: 23,
    },
  ];

  const moodHistory = [
    { date: 'Today', mood: '😊', score: 8, activities: 3 },
    { date: 'Yesterday', mood: '😐', score: 6, activities: 2 },
    { date: 'Dec 18', mood: '😍', score: 9, activities: 4 },
    { date: 'Dec 17', mood: '😊', score: 7, activities: 3 },
    { date: 'Dec 16', mood: '😢', score: 4, activities: 1 },
    { date: 'Dec 15', mood: '😊', score: 8, activities: 3 },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const inProgressAchievements = achievements.filter(a => !a.unlocked);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <User size={32} color="#3B82F6" />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Alex Thompson</Text>
              <View style={styles.levelContainer}>
                <Crown size={16} color="#F59E0B" />
                <Text style={styles.userLevel}>Wellness Level 3</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'stats' && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab('stats')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'stats' && styles.tabTextActive,
              ]}
            >
              Statistics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'achievements' && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab('achievements')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'achievements' && styles.tabTextActive,
              ]}
            >
              Achievements
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'history' && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab('history')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'history' && styles.tabTextActive,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {selectedTab === 'stats' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <View style={styles.statsGrid}>
              {userStats.map((stat) => (
                <StatCard
                  key={stat.id}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  color={stat.color}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>This Week's Highlights</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <Trophy size={20} color="#F59E0B" />
                <Text style={styles.summaryTitle}>Weekly Summary</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>• Consistent daily check-ins (7/7 days)</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>• Improved average mood score (+15%)</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>• 2 new achievements unlocked</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>• 18 wellness activities completed</Text>
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'achievements' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              Unlocked Achievements ({unlockedAchievements.length})
            </Text>
            <View style={styles.achievementsSection}>
              {unlockedAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  unlocked={achievement.unlocked}
                  progress={achievement.progress}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>
              In Progress ({inProgressAchievements.length})
            </Text>
            <View style={styles.achievementsSection}>
              {inProgressAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  unlocked={achievement.unlocked}
                  progress={achievement.progress}
                />
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'history' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Mood History</Text>
            <View style={styles.historyContainer}>
              {moodHistory.map((entry, index) => (
                <View key={index} style={styles.historyItem}>
                  <View style={styles.historyDate}>
                    <Text style={styles.historyDateText}>{entry.date}</Text>
                  </View>
                  <View style={styles.historyMood}>
                    <Text style={styles.historyMoodEmoji}>{entry.mood}</Text>
                    <Text style={styles.historyMoodScore}>{entry.score}/10</Text>
                  </View>
                  <View style={styles.historyActivities}>
                    <Text style={styles.historyActivitiesText}>
                      {entry.activities} activities
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userLevel: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  achievementsSection: {
    gap: 12,
    marginBottom: 32,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  summaryItem: {
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
  historyContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyDate: {
    width: 80,
  },
  historyDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  historyMood: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyMoodEmoji: {
    fontSize: 24,
  },
  historyMoodScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  historyActivities: {
    alignItems: 'flex-end',
  },
  historyActivitiesText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
});