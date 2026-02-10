import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  const router = useRouter();

  return (
    <View className="flex flex-row justify-between w-full items-center mt-6">
      <View>
        <Text className="font-family-regular text-black-text text-lg">
          Hi {userName},
        </Text>
        <Text className="font-family-bold text-lg text-black-text">
          Find Your
          <Text className="font-family-bold text-lg text-green">
            {" "}
            Suitable Doctor
          </Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/(home)/notifications")}>
        <Image
          source={require("@/assets/icons/heart.png")}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
}
