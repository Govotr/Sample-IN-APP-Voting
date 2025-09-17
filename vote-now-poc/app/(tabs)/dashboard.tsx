import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const colorScheme = useColorScheme();

  const handleLogout = () => {
    router.replace('/login');
  };

  const mockData = {
    totalValue: '$125,430.50',
    todayChange: '+$2,340.20',
    todayChangePercent: '+1.91%',
    portfolio: [
      { symbol: 'AAPL', name: 'Apple Inc.', value: '$45,230.00', change: '+$890.50', changePercent: '+2.01%' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', value: '$32,150.00', change: '+$450.20', changePercent: '+1.42%' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', value: '$28,900.00', change: '+$320.80', changePercent: '+1.12%' },
      { symbol: 'TSLA', name: 'Tesla Inc.', value: '$19,150.50', change: '+$679.70', changePercent: '+3.68%' },
    ],
    recentActivity: [
      { action: 'Bought', symbol: 'AAPL', shares: '10', price: '$180.25', time: '2 hours ago' },
      { action: 'Sold', symbol: 'GOOGL', shares: '5', price: '$142.80', time: '1 day ago' },
      { action: 'Dividend', symbol: 'MSFT', amount: '$45.20', time: '3 days ago' },
    ],
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      backgroundColor: '#000000',
      paddingTop: 50,
      paddingBottom: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
    },
    logoutText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    balanceSection: {
      padding: 25,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      marginTop: 0,
      borderRadius: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      marginHorizontal: 10,
    },
    balanceHeading: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[colorScheme ?? 'light'].text,
      opacity: 0.7,
      marginBottom: 8,
    },
    pnlHeading: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[colorScheme ?? 'light'].text,
      opacity: 0.7,
      marginTop: 20,
      marginBottom: 8,
    },
    totalValue: {
      fontSize: 36,
      fontWeight: 'bold',
      lineHeight:36,
      color: Colors[colorScheme ?? 'light'].text,
      textAlign: 'center',
    },
    todayChange: {
      fontSize: 18,
      color: '#4CAF50',
      textAlign: 'center',
      marginTop: 2,
    },
    section: {
      margin: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 16,
    },
    portfolioItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#333' : '#ddd',
    },
    portfolioLeft: {
      flex: 1,
    },
    portfolioSymbol: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
    },
    portfolioName: {
      fontSize: 14,
      color: Colors[colorScheme ?? 'light'].text,
      opacity: 0.7,
      marginTop: 2,
    },
    portfolioRight: {
      alignItems: 'flex-end',
    },
    portfolioValue: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[colorScheme ?? 'light'].text,
    },
    portfolioChange: {
      fontSize: 14,
      color: '#4CAF50',
      marginTop: 2,
    },
    activityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#333' : '#ddd',
    },
    activityIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: Colors[colorScheme ?? 'light'].tint,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    activityContent: {
      flex: 1,
    },
    activityText: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[colorScheme ?? 'light'].text,
    },
    activityTime: {
      fontSize: 14,
      color: Colors[colorScheme ?? 'light'].text,
      opacity: 0.6,
      marginTop: 2,
    },
    quickActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
      marginTop: 10,
    },
    quickActionButton: {
      flex: 1,
      backgroundColor: '#2E2E2E',
      padding: 20,
      borderRadius: 16,
      alignItems: 'center',
      marginHorizontal: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    quickActionText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginTop: 8,
    },
  });

  return (
    <ThemedView style={styles.container}>
      {/* Small Black Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Dashboard</ThemedText>
          <Text onPress={handleLogout} style={styles.logoutText}>Logout</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Your Balance Section */}
        <View style={styles.balanceSection}>
          <ThemedText style={styles.balanceHeading}>Your Balance</ThemedText>
          <ThemedText style={styles.totalValue}>{mockData.totalValue}</ThemedText>
          
          <ThemedText style={styles.pnlHeading}>Today's PnL</ThemedText>
          <ThemedText style={styles.todayChange}>
            {mockData.todayChange} ({mockData.todayChangePercent})
          </ThemedText>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.quickActionText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <MaterialIcons name="remove" size={24} color="white" />
            <Text style={styles.quickActionText}>Sell</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <MaterialIcons name="trending-up" size={24} color="white" />
            <Text style={styles.quickActionText}>Trade</Text>
          </TouchableOpacity>
        </View>

        {/* Portfolio Holdings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Your Holdings</ThemedText>
          {mockData.portfolio.map((item, index) => (
            <View key={index} style={styles.portfolioItem}>
              <View style={styles.portfolioLeft}>
                <ThemedText style={styles.portfolioSymbol}>{item.symbol}</ThemedText>
                <ThemedText style={styles.portfolioName}>{item.name}</ThemedText>
              </View>
              <View style={styles.portfolioRight}>
                <ThemedText style={styles.portfolioValue}>{item.value}</ThemedText>
                <ThemedText style={styles.portfolioChange}>
                  {item.change} ({item.changePercent})
                </ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
          {mockData.recentActivity.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityContent}>
                <ThemedText style={styles.activityText}>
                  {activity.action} {activity.shares ? `${activity.shares} shares of` : ''} {activity.symbol} {activity.price ? `at ${activity.price}` : ''} {activity.amount ? `(${activity.amount})` : ''}
                </ThemedText>
                <ThemedText style={styles.activityTime}>{activity.time}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
