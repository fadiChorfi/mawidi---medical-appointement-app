import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Reservation() {
  //here it should be a  2 tabs
  return (
    <View className="flex-1 items-center bg-white ">
      <SafeAreaView edges={["top", "bottom"]} />
      <Text>Reservations Page</Text>
    </View>
  );
}
