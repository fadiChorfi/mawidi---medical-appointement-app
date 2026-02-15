import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Specialities() {
  return (
    <View className="flex-1 items-center justify-center">
      <SafeAreaView edges={["top"]} />
      <Text>Specialities</Text>
    </View>
  );
}
