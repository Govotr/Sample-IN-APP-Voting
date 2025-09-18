import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { VoteNowButton } from "@govotr/vote-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PortfolioScreen() {
  const colorScheme = useColorScheme();
  
  // Simple state for voting
  const [votingUrl, setVotingUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = () => {
    router.replace("/login");
  };

  // Function to handle vote API call
  const handleVoteClick = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://172.23.0.237:3001/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success && data.url) {
        setVotingUrl(data.url);
        console.log('Vote URL received:', data.url);
      } else {
        Alert.alert('Error', data.message || 'Failed to get voting URL');
      }
    } catch (error) {
      console.error('Vote API error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mockHoldings = [
    {
      id: "1",
      symbol: "TSLA",
      name: "Tesla Inc.",
      shares: 105,
      currentPrice: 182.38,
      totalValue: 19150.5,
      change: 679.7,
      changePercent: 3.68,
      email: "test@test.com",
      votingEligible: true,
      upcomingVote: "Board Election - March 20, 2024",
      image: require("@/assets/images/tesla_logoV1.png"),
    },
    {
      id: "2",
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 250,
      currentPrice: 180.92,
      totalValue: 45230.0,
      change: 890.5,
      changePercent: 2.01,
      email: "test@test.com",
      votingEligible: false,
      upcomingVote: "No upcoming votes",
      image: require("@/assets/images/apple-icon.png"),
    },
    {
      id: "3",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 225,
      currentPrice: 142.89,
      totalValue: 32150.0,
      change: 450.2,
      changePercent: 1.42,
      email: "test@test.com",
      votingEligible: false,
      upcomingVote: "No upcoming votes",
      image: require("@/assets/images/GOOGL.png"),
    },
    {
      id: "4",
      symbol: "MSFT",
      name: "Microsoft Corp.",
      shares: 160,
      currentPrice: 180.63,
      totalValue: 28900.0,
      change: 320.8,
      changePercent: 1.12,
      email: "test@test.com",
      votingEligible: false,
      upcomingVote: "No upcoming votes",
      image: require("@/assets/images/MSFT.png"),
    },
    {
      id: "5",
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      shares: 80,
      currentPrice: 155.25,
      totalValue: 12420.0,
      change: -120.5,
      changePercent: -0.96,
      email: "test@test.com",
      votingEligible: false,
      upcomingVote: "No upcoming votes",
      image: require("@/assets/images/AMZN.png"),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      backgroundColor: "#000000",
      paddingTop: 50,
      paddingBottom: 15,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "white",
    },
    logoutText: {
      color: "white",
      fontSize: 14,
      fontWeight: "600",
    },
    portfolioSummary: {
      padding: 20,
      backgroundColor: Colors[colorScheme ?? "light"].background,
      marginTop: 20,
      borderRadius: 20,
      marginHorizontal: 10,
    },
    totalValue: {
      fontSize: 28,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
      textAlign: "center",
    },
    totalChange: {
      fontSize: 16,
      color: "#4CAF50",
      textAlign: "center",
      marginTop: 4,
    },
    voteNowButton: {
      backgroundColor: "#5163FF",
      borderRadius: 12,
      alignItems: "center",
    },
    voteNowButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    voteNowSubtext: {
      color: "white",
      fontSize: 14,
      marginTop: 4,
      opacity: 0.9,
    },
    section: {
      margin: 20,
      marginTop: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
      marginBottom: 16,
    },
    holdingItem: {
      backgroundColor: Colors[colorScheme ?? "light"].background,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colorScheme === "dark" ? "#333" : "#ddd",
      overflow: "hidden",
    },
    holdingHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    companyImageContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
      overflow: "hidden",
    },
    companyImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    holdingInfo: {
      flex: 1,
    },
    holdingSymbol: {
      fontSize: 18,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
    },
    holdingName: {
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].text,
      opacity: 0.7,
      marginTop: 2,
    },
    holdingValue: {
      alignItems: "flex-end",
      fontSize: 14,
      fontWeight: "600",
      color: Colors[colorScheme ?? "light"].text,
    },
    holdingTotalValue: {
      fontSize: 16,
      fontWeight: "600",
      color: Colors[colorScheme ?? "light"].text,
    },
    holdingChange: {
      fontSize: 14,
      color: "#4CAF50",
      marginTop: 2,
    },
    holdingDetails: {
      padding: 14,
      paddingTop: 0,
      borderTopWidth: 1,
      borderTopColor: colorScheme === "dark" ? "#333" : "#ddd",
    },
    holdingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    holdingLabel: {
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].text,
      opacity: 0.7,
    },
    votingInfo: {
      padding: 2,
      borderRadius: 8,
      marginTop: 8,
    },
    votingText: {
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].tint,
      fontWeight: "600",
    },
    notEligibleText: {
      color: "#FF6B6B",
    },
    selectedCount: {
      textAlign: "center",
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].text,
      opacity: 0.7,
      marginBottom: 10,
    },
    individualVoteButton: {
      backgroundColor: "#5263FF",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    individualVoteButtonDisabled: {
      backgroundColor: "#ccc",
    },
    individualVoteButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    individualVoteButtonTextDisabled: {
      color: "#666",
    },
  });

  return (
    <ThemedView style={styles.container}>
      {/* Small Black Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Portfolio</ThemedText>
        <Text onPress={handleLogout} style={styles.logoutText}>
          Logout
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Portfolio Summary */}
        <View style={styles.portfolioSummary}>
          <ThemedText style={styles.totalValue}>$137,850.50</ThemedText>
          <ThemedText style={styles.totalChange}>
            +$2,220.70 (+1.64%)
          </ThemedText>
        </View>

        {/* Holdings List */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Your Holdings</ThemedText>
          {mockHoldings.map((holding) => (
            <View key={holding.id} style={styles.holdingItem} {...({} as any)}>
              <View style={styles.holdingHeader}>
                <View style={styles.companyImageContainer}>
                  <Image
                    source={holding.image}
                    style={styles.companyImage}
                    defaultSource={require("@/assets/images/icon.png")}
                  />
                </View>
                <View style={styles.holdingInfo}>
                  <ThemedText style={styles.holdingSymbol}>
                    {holding.symbol}
                  </ThemedText>
                  <ThemedText style={styles.holdingName}>
                    {holding.name}
                  </ThemedText>
                </View>
                <View style={styles.holdingValue}>
                  <ThemedText style={styles.holdingTotalValue}>
                    ${holding.totalValue.toLocaleString()}
                  </ThemedText>
                  <ThemedText style={styles.holdingChange}>
                    {holding.change > 0 ? "+" : ""}${holding.change.toFixed(2)}{" "}
                    ({holding.changePercent > 0 ? "+" : ""}
                    {holding.changePercent.toFixed(2)}%)
                  </ThemedText>
                </View>
              </View>
              <View style={styles.holdingDetails}>
                <View style={styles.holdingRow}>
                  <ThemedText style={styles.holdingLabel}>Shares</ThemedText>
                  <ThemedText style={styles.holdingValue}>
                    {holding.shares}
                  </ThemedText>
                </View>
                <View style={styles.holdingRow}>
                  <ThemedText style={styles.holdingLabel}>
                    Current Price
                  </ThemedText>
                  <ThemedText style={styles.holdingValue}>
                    ${holding.currentPrice.toFixed(2)}
                  </ThemedText>
                </View>
                <View style={[styles.votingInfo]}>
                  <ThemedText
                    style={[
                      styles.votingText,
                      !holding.votingEligible && styles.notEligibleText,
                    ]}
                  >
                    {holding.upcomingVote}
                  </ThemedText>
                </View>
                {/* Vote Now Button with onPress */}
                {holding.symbol === "TSLA" && (
                  <VoteNowButton
                    URL={votingUrl ? votingUrl : ''}
                    label="Vote Now"
                    buttonStyle={styles.voteNowButton}
                    textStyle={styles.voteNowButtonText}
                    onPress={handleVoteClick}
                    isLoading={holding.symbol == "TSLA" ? isLoading : false}
                    onSuccess={() => {
                      setVotingUrl(''); // Clear URL after successful vote
                    }}
                    onBack={() => {
                      setVotingUrl(''); 
                    }}
                    onError={(error) => {
                      console.log(error);
                    }}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
