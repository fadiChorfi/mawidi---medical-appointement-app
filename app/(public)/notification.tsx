import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
};

const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Appointment Reminder",
    description: "You have an appointment tomorrow at 10:00 AM.",
  },
  {
    id: "2",
    title: "New Message",
    description: "Dr. Smith has sent you a message.",
  },
  {
    id: "3",
    title: "Health Tips",
    description: "Remember to drink water and stay hydrated!",
  },
  {
    id: "4",
    title: "Appointment Reminder",
    description: "You have an appointment tomorrow at 10:00 AM.",
  },
  {
    id: "5",
    title: "New Message",
    description: "Dr. Smith has sent you a message.",
  },
  {
    id: "6",
    title: "Health Tips",
    description: "Remember to drink water and stay hydrated!",
  },
];

export default function Notification() {
  const renderItem = ({ item }: { item: NotificationItem }) => (
    <View style={styles.notificationCard}>
      <Ionicons
        name="notifications"
        size={24}
        color="#00B894"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView edges={["top"]} />
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#00B894",
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 15,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});
