import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpecializationId() {
  const param = useLocalSearchParams<{
    specializationId: string;
  }>();

  const doctorId = param.specializationId;

  console.log("id", param.specializationId);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => {
            return (
              <Text className="text-lg font-family-bold text-black-text">
                {doctorId}
              </Text>
            );
          },
        }}
      />
      <View className="flex-1 items-center justify-center">
        <SafeAreaView edges={["top"]} />
        <Text>CategoryId</Text>
      </View>
    </>
  );
}
