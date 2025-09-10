import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Search, Book, Video, Headphones, Heart, Filter } from 'lucide-react-native';
import { ResourceCard } from '@/components/ResourceCard';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'exercise';
  category: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'anxiety', label: 'Anxiety' },
    { id: 'depression', label: 'Depression' },
    { id: 'stress', label: 'Stress' },
    { id: 'mindfulness', label: 'Mindfulness' },
    { id: 'sleep', label: 'Sleep' },
    { id: 'relationships', label: 'Relationships' },
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Anxiety',
      description: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies',
      type: 'article',
      category: 'anxiety',
      duration: '8 min read',
      difficulty: 'beginner',
    },
    {
      id: '2',
      title: 'Guided Breathing Exercise',
      description: 'A calming 10-minute breathing meditation for stress relief',
      type: 'audio',
      category: 'mindfulness',
      duration: '10 min',
      difficulty: 'beginner',
    },
    {
      id: '3',
      title: 'Managing Daily Stress',
      description: 'Practical techniques and tools for effective stress management',
      type: 'video',
      category: 'stress',
      duration: '15 min',
      difficulty: 'intermediate',
    },
    {
      id: '4',
      title: 'Sleep Hygiene Guide',
      description: 'Improve your sleep quality with these evidence-based tips and techniques',
      type: 'article',
      category: 'sleep',
      duration: '6 min read',
      difficulty: 'beginner',
    },
    {
      id: '5',
      title: 'Progressive Muscle Relaxation',
      description: 'Full-body relaxation technique for deep stress relief and tension release',
      type: 'exercise',
      category: 'stress',
      duration: '20 min',
      difficulty: 'beginner',
    },
    {
      id: '6',
      title: 'Cognitive Behavioral Techniques',
      description: 'Learn CBT strategies for managing negative thought patterns',
      type: 'video',
      category: 'depression',
      duration: '25 min',
      difficulty: 'advanced',
    },
    {
      id: '7',
      title: 'Mindful Walking Meditation',
      description: 'Connect with the present moment through mindful movement',
      type: 'audio',
      category: 'mindfulness',
      duration: '12 min',
      difficulty: 'beginner',
    },
    {
      id: '8',
      title: 'Building Healthy Boundaries',
      description: 'Essential skills for maintaining healthy relationships and self-care',
      type: 'article',
      category: 'relationships',
      duration: '10 min read',
      difficulty: 'intermediate',
    },
    {
      id: '9',
      title: 'Body Scan Meditation',
      description: 'Develop body awareness and release physical tension',
      type: 'exercise',
      category: 'mindfulness',
      duration: '18 min',
      difficulty: 'intermediate',
    },
    {
      id: '10',
      title: 'Dealing with Panic Attacks',
      description: 'Emergency techniques and long-term strategies for panic management',
      type: 'video',
      category: 'anxiety',
      duration: '12 min',
      difficulty: 'intermediate',
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Book size={20} color="#3B82F6" />;
      case 'video':
        return <Video size={20} color="#10B981" />;
      case 'audio':
        return <Headphones size={20} color="#8B5CF6" />;
      case 'exercise':
        return <Heart size={20} color="#F59E0B" />;
      default:
        return <Book size={20} color="#64748B" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mental Health Resources</Text>
        <Text style={styles.headerSubtitle}>
          Evidence-based tools and information for your wellbeing
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Resource Count */}
      <View style={styles.resultSummary}>
        <Text style={styles.resultText}>
          {filteredResources.length} resources found
        </Text>
        <Filter size={16} color="#64748B" />
      </View>

      {/* Resources */}
      <ScrollView style={styles.resourcesList} showsVerticalScrollIndicator={false}>
        <View style={styles.resourcesContainer}>
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              icon={getResourceIcon(resource.type)}
              duration={resource.duration}
              difficulty={resource.difficulty}
              onPress={() => {
                // In a real app, this would navigate to the resource detail
                console.log('Opening resource:', resource.title);
              }}
            />
          ))}
        </View>

        {filteredResources.length === 0 && (
          <View style={styles.emptyState}>
            <Book size={48} color="#94a3b8" />
            <Text style={styles.emptyStateText}>
              No resources found
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or category filter
            </Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  clearText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  resultSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  resourcesList: {
    flex: 1,
  },
  resourcesContainer: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});