import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const moodOptions: MoodOption[] = [
  { id: 'amazing', emoji: '😍', label: 'Amazing', color: '#10B981' },
  { id: 'happy', emoji: '😊', label: 'Happy', color: '#22C55E' },
  { id: 'okay', emoji: '😐', label: 'Okay', color: '#F59E0B' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: '#F97316' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#EF4444' },
];

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <View style={styles.moodGrid}>
        {moodOptions.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodButton,
              selectedMood === mood.id && {
                backgroundColor: mood.color,
                transform: [{ scale: 1.05 }],
              },
            ]}
            onPress={() => onMoodSelect(mood.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text
              style={[
                styles.moodLabel,
                selectedMood === mood.id && styles.moodLabelSelected,
              ]}
            >
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
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
  moodEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  moodLabelSelected: {
    color: '#ffffff',
  },
});