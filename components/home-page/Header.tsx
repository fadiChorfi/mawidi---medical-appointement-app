import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  userName: string;
  location?: string;
}

export default function Header({
  userName,
  location = "New York, USA",
}: HeaderProps) {
  const router = useRouter();

  return (
    <View className="flex flex-col w-full mt-6 gap-3">
      {/* Header Content */}
      <View className="flex flex-row justify-between w-full items-center">
        <View>
          <View className="flex-row items-baseline gap-2">
            <Text className="font-family-regular text-black-text text-lg">
              Hi {userName}
            </Text>
          </View>
          <Text className="font-family-bold text-lg text-black-text">
            Find Your
            <Text className="font-family-bold text-lg text-green">
              {" "}
              Suitable Doctor
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          className="relative"
          onPress={() => router.push("/(public)/notification", )}
        >
          <Image
            source={require("@/assets/icons/bell.png")}
            style={{ height: 24, width: 24 }}
          />
          <View className="absolute -top-0.5 left-3 bg-red-400 h-2 w-2 rounded-full border border-white " />
        </TouchableOpacity>
      </View>
    </View>
  );
}
