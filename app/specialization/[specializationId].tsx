import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpecializationId() {
  const param = useLocalSearchParams<{
    categoryId: string;
  }>();

  console.log("id", param.categoryId);

  return (
    <View className="flex-1 items-center justify-center">
      <SafeAreaView edges={["top"]} />
      <Text>CategoryId</Text>
    </View>
  );
}
