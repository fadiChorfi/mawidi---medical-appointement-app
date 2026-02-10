import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  value: string | null;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
}: SearchBarProps) {
  return (
    <View className="flex flex-row gap-6 w-full items-center mt-6">
      <View className="relative flex-1">
        <TextInput
          className="font-family-regular shadow-xs border-px border-black/55 text-black-text text-base bg-white rounded-lg pl-12"
          placeholder="Search ..."
          value={value ?? ""}
          onChangeText={onChangeText}
        />
        <Feather
          name="search"
          size={20}
          color="#0b0b0b"
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
      </View>
      <TouchableOpacity
        className="bg-primary rounded-lg p-2 shadow-xs"
        onPress={onFilterPress}
      >
        <Image
          source={require("@/assets/icons/filter-light.png")}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
}
