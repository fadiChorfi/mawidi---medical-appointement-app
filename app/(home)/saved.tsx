import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  return (
    <View className="flex-1 items-center bg-bg-secondary ">
      <SafeAreaView edges={["top", "bottom"]} />
      <Text></Text>
    </View>
  );
}
