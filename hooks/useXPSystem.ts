import { useState, useEffect } from 'react';

export interface XPActivity {
  id: string;
  name: string;
  xp: number;
  category: 'mood' | 'activity' | 'streak' | 'achievement' | 'chat';
}

export interface XPEntry {
  id: string;
  activity: XPActivity;
  timestamp: Date;
  bonus?: number;
}

export interface UserLevel {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  title: string;
}

const XP_ACTIVITIES: XPActivity[] = [
  { id: 'mood_checkin', name: 'Daily Mood Check-in', xp: 10, category: 'mood' },
  { id: 'meditation', name: 'Meditation Session', xp: 15, category: 'activity' },
  { id: 'gratitude_journal', name: 'Gratitude Journal', xp: 12, category: 'activity' },
  { id: 'breathing_exercise', name: 'Breathing Exercise', xp: 8, category: 'activity' },
  { id: 'positive_affirmations', name: 'Positive Affirmations', xp: 10, category: 'activity' },
  { id: 'streak_3_days', name: '3-Day Streak Bonus', xp: 25, category: 'streak' },
  { id: 'streak_7_days', name: '7-Day Streak Bonus', xp: 50, category: 'streak' },
  { id: 'streak_30_days', name: '30-Day Streak Bonus', xp: 200, category: 'streak' },
  { id: 'first_achievement', name: 'First Achievement', xp: 30, category: 'achievement' },
  { id: 'chat_session', name: 'AI Chat Session', xp: 5, category: 'chat' },
];

const LEVEL_TITLES = [
  'Wellness Beginner',
  'Mindful Explorer',
  'Calm Seeker',
  'Wellness Warrior',
  'Mindfulness Master',
  'Zen Champion',
  'Wellness Guru',
  'Serenity Sage',
  'Wellness Legend',
  'Enlightened One',
];

// XP required for each level (exponential growth)
const getXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

const getLevelFromXP = (totalXP: number): UserLevel => {
  let level = 1;
  let xpUsed = 0;
  
  while (true) {
    const xpForCurrentLevel = getXPForLevel(level);
    if (xpUsed + xpForCurrentLevel > totalXP) {
      break;
    }
    xpUsed += xpForCurrentLevel;
    level++;
  }
  
  const xpForNextLevel = getXPForLevel(level);
  const currentXP = totalXP - xpUsed;
  const xpToNextLevel = xpForNextLevel - currentXP;
  
  return {
    level,
    currentXP,
    xpToNextLevel,
    totalXP,
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
  };
};

export function useXPSystem() {
  const [xpEntries, setXpEntries] = useState<XPEntry[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [userLevel, setUserLevel] = useState<UserLevel>(getLevelFromXP(0));

  // Initialize with some sample XP entries
  useEffect(() => {
    const sampleEntries: XPEntry[] = [
      {
        id: '1',
        activity: XP_ACTIVITIES.find(a => a.id === 'mood_checkin')!,
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        activity: XP_ACTIVITIES.find(a => a.id === 'meditation')!,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: '3',
        activity: XP_ACTIVITIES.find(a => a.id === 'mood_checkin')!,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: '4',
        activity: XP_ACTIVITIES.find(a => a.id === 'gratitude_journal')!,
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: '5',
        activity: XP_ACTIVITIES.find(a => a.id === 'streak_3_days')!,
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: '6',
        activity: XP_ACTIVITIES.find(a => a.id === 'mood_checkin')!,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: '7',
        activity: XP_ACTIVITIES.find(a => a.id === 'breathing_exercise')!,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: '8',
        activity: XP_ACTIVITIES.find(a => a.id === 'first_achievement')!,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ];
    
    setXpEntries(sampleEntries);
    const total = sampleEntries.reduce((sum, entry) => sum + entry.activity.xp + (entry.bonus || 0), 0);
    setTotalXP(total);
    setUserLevel(getLevelFromXP(total));
  }, []);

  const addXP = (activityId: string, bonus: number = 0): XPEntry | null => {
    const activity = XP_ACTIVITIES.find(a => a.id === activityId);
    if (!activity) return null;

    // Check for daily limits on certain activities
    const today = new Date().toDateString();
    const todaysEntries = xpEntries.filter(entry => 
      entry.timestamp.toDateString() === today && 
      entry.activity.id === activityId
    );

    // Limit mood check-ins to once per day
    if (activityId === 'mood_checkin' && todaysEntries.length > 0) {
      return null;
    }

    const newEntry: XPEntry = {
      id: Date.now().toString(),
      activity,
      timestamp: new Date(),
      bonus,
    };

    const newEntries = [...xpEntries, newEntry];
    setXpEntries(newEntries);
    
    const newTotal = totalXP + activity.xp + bonus;
    setTotalXP(newTotal);
    setUserLevel(getLevelFromXP(newTotal));

    return newEntry;
  };

  const getXPForActivity = (activityId: string): number => {
    const activity = XP_ACTIVITIES.find(a => a.id === activityId);
    return activity?.xp || 0;
  };

  const getTodaysXP = (): number => {
    const today = new Date().toDateString();
    return xpEntries
      .filter(entry => entry.timestamp.toDateString() === today)
      .reduce((sum, entry) => sum + entry.activity.xp + (entry.bonus || 0), 0);
  };

  const getRecentXPEntries = (limit: number = 5): XPEntry[] => {
    return xpEntries
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  };

  const checkStreakBonus = (streakDays: number): XPEntry | null => {
    if (streakDays === 3) {
      return addXP('streak_3_days');
    } else if (streakDays === 7) {
      return addXP('streak_7_days');
    } else if (streakDays === 30) {
      return addXP('streak_30_days');
    }
    return null;
  };

  return {
    userLevel,
    totalXP,
    xpEntries,
    addXP,
    getXPForActivity,
    getTodaysXP,
    getRecentXPEntries,
    checkStreakBonus,
    XP_ACTIVITIES,
  };
}