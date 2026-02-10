import { Header, SearchBar } from "@/components/home-page";
import CategoriesSlide from "@/components/home-page/categories-slide";
import ListDoctors from "@/components/home-page/list-doctors";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [inputSearch, setInputSearch] = useState<string | null>(null);
  const username = "Fady";

  return (
    <View className="flex-1 items-center bg-bg-secondary ">
      <SafeAreaView edges={["top", "bottom"]} />
      <View className="flex-col h-fit  w-full px-6">
        <Header userName={username} />
        <SearchBar
          value={inputSearch}
          onChangeText={(text) => setInputSearch(text)}
        />
      </View>
      <CategoriesSlide />
      <ListDoctors />
    </View>
  );
}
