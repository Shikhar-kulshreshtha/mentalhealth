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
import { Flame, Calendar, Target, TrendingUp, Plus } from 'lucide-react-native';
import { MoodSelector } from '@/components/MoodSelector';
import { AchievementCard } from '@/components/AchievementCard';
import { StreakCounter } from '@/components/StreakCounter';
import { WellnessCard } from '@/components/WellnessCard';
import { MoodHistoryChart } from '@/components/MoodHistoryChart';
import { XPProgressBar } from '@/components/XPProgressBar';
import { XPNotification } from '@/components/XPNotification';
import { XPActivityFeed } from '@/components/XPActivityFeed';
import { useMoodHistory } from '@/hooks/useMoodHistory';
import { useXPSystem, XPEntry } from '@/hooks/useXPSystem';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const [streakDays, setStreakDays] = useState(7);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [xpNotification, setXpNotification] = useState<XPEntry | null>(null);
  
  const { moodHistory, addMoodEntry, getTodaysMood } = useMoodHistory();
  const { userLevel, addXP, getTodaysXP, getRecentXPEntries, checkStreakBonus } = useXPSystem();
  const todaysMood = getTodaysMood();
  const currentMood = todaysMood?.mood || null;

  const handleMoodSelect = (mood: string) => {
    addMoodEntry(mood);
    // Award XP for mood check-in
    const xpEntry = addXP('mood_checkin');
    if (xpEntry) {
      setXpNotification(xpEntry);
    }
  };

  const handleXPNotificationComplete = () => {
    setXpNotification(null);
  };

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first mood check-in',
      unlocked: currentMood !== null,
      progress: currentMood !== null ? 100 : 0,
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintained a 7-day streak',
      unlocked: streakDays >= 7,
      progress: Math.min((streakDays / 7) * 100, 100),
    },
    {
      id: '3',
      title: 'Mindful Master',
      description: 'Complete 5 wellness activities',
      unlocked: completedActivities.size >= 5,
      progress: (completedActivities.size / 5) * 100,
    },
    {
      id: '4',
      title: 'Consistency Champion',
      description: 'Maintain a 30-day streak',
      unlocked: streakDays >= 30,
      progress: (streakDays / 30) * 100,
    },
  ];

  const wellnessActivities = [
    {
      id: '1',
      title: 'Daily Meditation',
      description: '5-minute guided breathing exercise to center yourself',
      duration: '5 min',
      completed: completedActivities.has('1'),
      xpActivity: 'meditation',
    },
    {
      id: '2',
      title: 'Gratitude Journal',
      description: 'Write down 3 things you\'re grateful for today',
      duration: '3 min',
      completed: completedActivities.has('2'),
      xpActivity: 'gratitude_journal',
    },
    {
      id: '3',
      title: 'Mood Reflection',
      description: 'Take a moment to reflect on your current emotions',
      duration: '2 min',
      completed: currentMood !== null,
      xpActivity: 'mood_checkin',
    },
    {
      id: '4',
      title: 'Deep Breathing',
      description: 'Practice the 4-7-8 breathing technique',
      duration: '4 min',
      completed: completedActivities.has('4'),
      xpActivity: 'breathing_exercise',
    },
    {
      id: '5',
      title: 'Positive Affirmations',
      description: 'Repeat empowering statements to boost confidence',
      duration: '3 min',
      completed: completedActivities.has('5'),
      xpActivity: 'positive_affirmations',
    },
  ];

  const handleActivityComplete = (activityId: string) => {
    const activity = wellnessActivities.find(a => a.id === activityId);
    
    const newCompleted = new Set(completedActivities);
    if (newCompleted.has(activityId)) {
      newCompleted.delete(activityId);
    } else {
      newCompleted.add(activityId);
      // Award XP for completing activity
      if (activity?.xpActivity && activityId !== '3') { // Don't double-award for mood reflection
        const xpEntry = addXP(activity.xpActivity);
        if (xpEntry) {
          setXpNotification(xpEntry);
        }
      }
    }
    setCompletedActivities(newCompleted);
  };

  const completedCount = wellnessActivities.filter(activity => 
    activity.id === '3' ? currentMood !== null : completedActivities.has(activity.id)
  ).length;

  const todaysXP = getTodaysXP();
  const recentXPEntries = getRecentXPEntries(5);

  return (
    <SafeAreaView style={styles.container}>
      <XPNotification 
        xpEntry={xpNotification} 
        onComplete={handleXPNotificationComplete} 
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning! 🌅</Text>
          <Text style={styles.subtitle}>How are you feeling today?</Text>
        </View>

        {/* XP Progress */}
        <View style={styles.section}>
          <View style={styles.xpContainer}>
            <XPProgressBar userLevel={userLevel} />
          </View>
        </View>

        {/* Mood Selector */}
        <View style={styles.section}>
          <MoodSelector
            selectedMood={currentMood}
            onMoodSelect={handleMoodSelect}
          />
        </View>

        {/* Streak Counter */}
        <View style={styles.section}>
          <StreakCounter days={streakDays} />
        </View>

        {/* Mood History Chart */}
        <View style={styles.section}>
          <MoodHistoryChart moodHistory={moodHistory} />
        </View>

        {/* Progress Summary */}
        <View style={styles.section}>
          <View style={styles.progressSummary}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressCount}>
              {completedCount}/{wellnessActivities.length} activities completed
            </Text>
            <Text style={styles.xpEarned}>
              {todaysXP} XP earned today
            </Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(completedCount / wellnessActivities.length) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressPercentage}>
                {Math.round((completedCount / wellnessActivities.length) * 100)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Today's Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Wellness Activities</Text>
          <View style={styles.activitiesContainer}>
            {wellnessActivities.map((activity) => (
              <WellnessCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                duration={activity.duration}
                completed={activity.id === '3' ? currentMood !== null : completedActivities.has(activity.id)}
                onPress={() => handleActivityComplete(activity.id)}
              />
            ))}
          </View>
        </View>

        {/* XP Activity Feed */}
        <View style={styles.section}>
          <View style={styles.xpFeedContainer}>
            <XPActivityFeed xpEntries={recentXPEntries} />
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.achievementsContainer}>
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  unlocked={achievement.unlocked}
                  progress={achievement.progress}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Calendar size={24} color="#3B82F6" />
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Target size={24} color="#10B981" />
              <Text style={styles.actionText}>Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <TrendingUp size={24} color="#F59E0B" />
              <Text style={styles.actionText}>Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Plus size={24} color="#8B5CF6" />
              <Text style={styles.actionText}>Add Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  xpContainer: {
    paddingHorizontal: 20,
  },
  xpFeedContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  activitiesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  achievementsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    minWidth: (width - 64) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  progressSummary: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  progressCount: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  xpEarned: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 12,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
    minWidth: 35,
  },
});