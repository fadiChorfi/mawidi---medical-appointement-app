import Feather from "@expo/vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface SearchBarProps {
  value: string | null;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  activeFilters?: {
    location?: string;
    date?: string;
    additionalCount?: number;
  };
  onClearFilters?: () => void;
}

const PLACEHOLDERS: string[] = [
  "Search by name, location, or date...",
  "Find your doctor...",
  "Search specialists...",
  "Search by name...",
];

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  activeFilters,
  onClearFilters,
}: SearchBarProps) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      opacity.value = withSequence(
        withTiming(0, { duration: 300 }),
        withTiming(1, { duration: 300 }),
      );

      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedPlaceholderStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const hasActiveFilters =
    activeFilters?.location ||
    activeFilters?.date ||
    (activeFilters?.additionalCount ?? 0) > 0;

  return (
    <View className="flex flex-col w-full items-center mt-6 gap-3">
      {/* Search Input and Filter Button Row */}
      <View className="flex-row w-full items-center gap-3">
        {/* Search Input */}
        <View className="relative flex-1 flex-row items-center bg-white rounded-2xl shadow-sm border border-black-text/5 px-4 py-1">
          <Feather
            name="search"
            size={18}
            color="#94A3B8"
            style={{ marginRight: 10 }}
          />
          <AnimatedTextInput
            className="font-family-regular text-black-text text-sm flex-1"
            placeholder={PLACEHOLDERS[placeholderIndex]}
            placeholderTextColor="#94A3B8"
            value={value ?? ""}
            onChangeText={onChangeText}
            style={animatedPlaceholderStyle}
          />
        </View>

        {/* Filter Button - Outside */}
        <TouchableOpacity
          className="bg-white  rounded-2xl px-4 py-3 flex-row items-center gap-2 shadow-sm"
          activeOpacity={0.8}
          onPress={onFilterPress}
        >
          <Text className="text-primary font-family-medium text-sm">
            Filter
          </Text>
        </TouchableOpacity>
      </View>

      {/* Active Filters */}
      {hasActiveFilters && (
        <View className="flex-row items-center gap-2 flex-wrap">
          {activeFilters?.location &&
            typeof activeFilters.location === "string" && (
              <View className="flex-row items-center bg-green/10 rounded-full px-3 py-1.5 gap-1">
                <Feather name="map-pin" size={12} color="#10B981" />
                <Text className="text-green font-family-medium text-xs">
                  {String(activeFilters.location)}
                </Text>
              </View>
            )}

          {activeFilters?.date && typeof activeFilters.date === "string" && (
            <View className="flex-row items-center bg-green/10 rounded-full px-3 py-1.5 gap-1">
              <Feather name="calendar" size={12} color="#10B981" />
              <Text className="text-green font-family-medium text-xs">
                {String(activeFilters.date)}
              </Text>
            </View>
          )}

          {activeFilters?.additionalCount &&
            activeFilters.additionalCount > 0 && (
              <View className="flex-row items-center bg-green/10 rounded-full px-3 py-1.5 gap-1">
                <Text className="text-green font-family-medium text-xs">
                  +{activeFilters.additionalCount} more
                </Text>
              </View>
            )}

          <TouchableOpacity onPress={onClearFilters} activeOpacity={0.7}>
            <Text className="text-gray-text font-family-medium text-xs underline">
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
