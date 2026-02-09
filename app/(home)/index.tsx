import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <View className="flex-1 items-center bg-white ">
      <SafeAreaView edges={["top", "bottom"]} />
      <Text>Home</Text>
      <Button
        title="click me"
        onPress={() => {
          router.push("/(auth)/sign-up");
        }}
      />
    </View>
  );
}
