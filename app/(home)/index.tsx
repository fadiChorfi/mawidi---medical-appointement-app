import { Header, SearchBar } from "@/components/home-page";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [inputSearch, setInputSearch] = useState<string | null>(null);

  return (
    <View className="flex-1 items-center bg-bg-secondary px-6">
      <SafeAreaView edges={["top", "bottom"]} />
      <View className="flex-col h-full w-full">
        <Header userName="Sam" />
        <SearchBar
          value={inputSearch}
          onChangeText={(text) => setInputSearch(text)}
        />
      </View>
    </View>
  );
}
