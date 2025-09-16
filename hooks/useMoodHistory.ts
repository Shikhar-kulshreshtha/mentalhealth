import { useState, useEffect } from 'react';

export interface MoodData {
  date: string;
  mood: string;
  score: number;
  timestamp: Date;
}

const moodScores: { [key: string]: number } = {
  'amazing': 10,
  'happy': 8,
  'okay': 6,
  'sad': 4,
  'anxious': 3,
};

export function useMoodHistory() {
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);

  // Load initial mock data
  useEffect(() => {
    const mockData: MoodData[] = [
      {
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        mood: 'happy',
        score: 8,
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
      {
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        mood: 'okay',
        score: 6,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        mood: 'amazing',
        score: 10,
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        mood: 'happy',
        score: 8,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        mood: 'sad',
        score: 4,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        mood: 'happy',
        score: 8,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ];
    setMoodHistory(mockData);
  }, []);

  const addMoodEntry = (mood: string) => {
    const score = moodScores[mood] || 5;
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    // Check if there's already an entry for today
    const existingEntryIndex = moodHistory.findIndex(entry => 
      entry.date.split('T')[0] === todayString
    );

    const newEntry: MoodData = {
      date: today.toISOString(),
      mood,
      score,
      timestamp: today,
    };

    if (existingEntryIndex >= 0) {
      // Update existing entry for today
      const updatedHistory = [...moodHistory];
      updatedHistory[existingEntryIndex] = newEntry;
      setMoodHistory(updatedHistory);
    } else {
      // Add new entry
      setMoodHistory(prev => [...prev, newEntry].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ));
    }
  };

  const getTodaysMood = () => {
    const today = new Date().toISOString().split('T')[0];
    return moodHistory.find(entry => entry.date.split('T')[0] === today);
  };

  const getWeeklyAverage = () => {
    const lastWeek = moodHistory.slice(-7);
    if (lastWeek.length === 0) return 0;
    return lastWeek.reduce((sum, entry) => sum + entry.score, 0) / lastWeek.length;
  };

  return {
    moodHistory,
    addMoodEntry,
    getTodaysMood,
    getWeeklyAverage,
  };
}