import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TrendingUp, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface MoodData {
  date: string;
  mood: string;
  score: number;
}

interface MoodHistoryChartProps {
  moodHistory: MoodData[];
}

export function MoodHistoryChart({ moodHistory }: MoodHistoryChartProps) {
  // Get last 7 days of data
  const last7Days = moodHistory.slice(-7);
  
  // Prepare data for chart
  const chartData = {
    labels: last7Days.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }),
    datasets: [
      {
        data: last7Days.map(item => item.score),
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#3B82F6',
      fill: '#ffffff',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#f1f5f9',
      strokeWidth: 1,
    },
  };

  const averageScore = last7Days.length > 0 
    ? (last7Days.reduce((sum, item) => sum + item.score, 0) / last7Days.length).toFixed(1)
    : '0.0';

  const trend = last7Days.length >= 2 
    ? last7Days[last7Days.length - 1].score - last7Days[0].score
    : 0;

  const getTrendColor = (trend: number) => {
    if (trend > 0) return '#10B981';
    if (trend < 0) return '#EF4444';
    return '#64748B';
  };

  const getTrendText = (trend: number) => {
    if (trend > 0) return `+${trend.toFixed(1)} this week`;
    if (trend < 0) return `${trend.toFixed(1)} this week`;
    return 'No change this week';
  };

  if (last7Days.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TrendingUp size={20} color="#3B82F6" />
          <Text style={styles.title}>Mood History</Text>
        </View>
        <View style={styles.emptyState}>
          <Calendar size={48} color="#94a3b8" />
          <Text style={styles.emptyText}>No mood data yet</Text>
          <Text style={styles.emptySubtext}>Start tracking your mood to see your progress</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TrendingUp size={20} color="#3B82F6" />
        <Text style={styles.title}>Mood History</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{averageScore}</Text>
          <Text style={styles.statLabel}>Average</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: getTrendColor(trend) }]}>
            {trend > 0 ? '+' : ''}{trend.toFixed(1)}
          </Text>
          <Text style={styles.statLabel}>Trend</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{last7Days.length}</Text>
          <Text style={styles.statLabel}>Days</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={width - 80}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          segments={4}
          yAxisInterval={1}
          fromZero={false}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.trendText, { color: getTrendColor(trend) }]}>
          {getTrendText(trend)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  footer: {
    alignItems: 'center',
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
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