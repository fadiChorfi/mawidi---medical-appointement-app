import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Notification = {
  id: number;
  type: "appointment" | "reminder" | "message" | "promotion";
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  image?: any;
};

const notificationsData: Notification[] = [
  {
    id: 1,
    type: "appointment",
    title: "Appointment Confirmed",
    description:
      "Your appointment with Dr. Sarah Johnson is confirmed for tomorrow at 10:00 AM.",
    time: "2 min ago",
    isRead: false,
    image: require("../assets/images/doc1.png"),
  },
  {
    id: 2,
    type: "reminder",
    title: "Upcoming Appointment",
    description:
      "Reminder: You have an appointment with Dr. Emily Chen in 2 hours.",
    time: "1 hour ago",
    isRead: false,
    image: require("../assets/images/doc2.png"),
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    description:
      "Dr. Sarah Johnson sent you a message regarding your test results.",
    time: "3 hours ago",
    isRead: true,
    image: require("../assets/images/doc1.png"),
  },
  {
    id: 4,
    type: "promotion",
    title: "Special Offer",
    description: "Get 20% off on your next health checkup. Book now!",
    time: "Yesterday",
    isRead: true,
  },
  {
    id: 5,
    type: "appointment",
    title: "Appointment Cancelled",
    description:
      "Your appointment with Dr. Emily Chen on Feb 10 has been cancelled.",
    time: "2 days ago",
    isRead: true,
    image: require("../assets/images/doc2.png"),
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "appointment":
      return <Ionicons name="calendar" size={20} color="#3D3EB0" />;
    case "reminder":
      return <Ionicons name="alarm" size={20} color="#F59E0B" />;
    case "message":
      return <Ionicons name="chatbubble" size={20} color="#10B981" />;
    case "promotion":
      return <MaterialCommunityIcons name="tag" size={20} color="#EF4444" />;
    default:
      return <Ionicons name="notifications" size={20} color="#3D3EB0" />;
  }
};

const getIconBgColor = (type: Notification["type"]) => {
  switch (type) {
    case "appointment":
      return "bg-[#3D3EB0]/10";
    case "reminder":
      return "bg-amber-100";
    case "message":
      return "bg-emerald-100";
    case "promotion":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView edges={["top"]}>
        <View className="flex flex-col gap-4 w-full py-4 px-5 bg-[#3D3EB0]">
          {/* Header */}
          <View className="flex-row items-center justify-between mt-2">
            <Pressable
              onPress={() => router.back()}
              className="bg-white/10 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <View className="flex-row items-center gap-2">
              <Text className="text-white text-xl font-semibold">
                Notifications
              </Text>
              {unreadCount > 0 && (
                <View className="bg-red-500 px-2 py-0.5 rounded-full">
                  <Text className="text-white text-xs font-medium">
                    {unreadCount}
                  </Text>
                </View>
              )}
            </View>
            <Pressable onPress={markAllAsRead} className="p-2">
              <Ionicons name="checkmark-done" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 mb-2">
          <Text className="text-gray-500 text-sm font-medium uppercase">
            Today
          </Text>
        </View>

        <View className="px-4">
          {notifications
            .filter((n) => n.time.includes("min") || n.time.includes("hour"))
            .map((item) => (
              <Pressable
                key={item.id}
                className={`flex-row items-start gap-3 p-4 mb-2 rounded-2xl ${
                  item.isRead ? "bg-white" : "bg-[#3D3EB0]/5"
                }`}
              >
                {item.image ? (
                  <Image
                    source={item.image}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <View
                    className={`w-12 h-12 rounded-full items-center justify-center ${getIconBgColor(
                      item.type,
                    )}`}
                  >
                    {getNotificationIcon(item.type)}
                  </View>
                )}
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-semibold text-gray-800">
                      {item.title}
                    </Text>
                    {!item.isRead && (
                      <View className="w-2 h-2 rounded-full bg-[#3D3EB0]" />
                    )}
                  </View>
                  <Text
                    className="text-sm text-gray-500 mb-1"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  <Text className="text-xs text-gray-400">{item.time}</Text>
                </View>
              </Pressable>
            ))}
        </View>

        <View className="px-5 mb-2 mt-4">
          <Text className="text-gray-500 text-sm font-medium uppercase">
            Earlier
          </Text>
        </View>

        <View className="px-4">
          {notifications
            .filter((n) => !n.time.includes("min") && !n.time.includes("hour"))
            .map((item) => (
              <Pressable
                key={item.id}
                className={`flex-row items-start gap-3 p-4 mb-2 rounded-2xl ${
                  item.isRead ? "bg-white" : "bg-[#3D3EB0]/5"
                }`}
              >
                {item.image ? (
                  <Image
                    source={item.image}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <View
                    className={`w-12 h-12 rounded-full items-center justify-center ${getIconBgColor(
                      item.type,
                    )}`}
                  >
                    {getNotificationIcon(item.type)}
                  </View>
                )}
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-semibold text-gray-800">
                      {item.title}
                    </Text>
                    {!item.isRead && (
                      <View className="w-2 h-2 rounded-full bg-[#3D3EB0]" />
                    )}
                  </View>
                  <Text
                    className="text-sm text-gray-500 mb-1"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  <Text className="text-xs text-gray-400">{item.time}</Text>
                </View>
              </Pressable>
            ))}
        </View>

        {notifications.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <View className="bg-gray-100 p-6 rounded-full mb-4">
              <Ionicons name="notifications-off" size={48} color="#9CA3AF" />
            </View>
            <Text className="text-xl font-semibold text-gray-800 mb-2">
              No Notifications
            </Text>
            <Text className="text-gray-500 text-center px-8">
              You&apos;re all caught up! Check back later for updates.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Notifications;
