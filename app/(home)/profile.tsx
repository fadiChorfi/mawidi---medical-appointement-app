import { useAuth } from "@/utils/auth-context";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { isLoggedIn, logOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-2xl font-bold mb-4">Profile</Text>
        <Text className="text-gray-600 mb-8">
          Status: {isLoggedIn ? "Logged In" : "Logged Out"}
        </Text>

        <TouchableOpacity onPress={logOut} className=" px-8 py-4 rounded-2xl">
          <Text className="text-white font-bold text-lg">Log Out</Text>
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">Log Out</Text>
      </View>
    </SafeAreaView>
  );
}
