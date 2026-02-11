import {
  FilterModal,
  FilterOptions,
  Header,
  SearchBar,
} from "@/components/home-page";
import CategoriesSlide from "@/components/home-page/categories-slide";
import ListDoctors from "@/components/home-page/list-doctors";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const username = "Fady";

  const [inputSearch, setInputSearch] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    specialization: [],
    location: "",
    appointmentDate: null,
  });

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    console.log("Applied filters:", filters);
  };

  const handleClearFilters = () => {
    setInputSearch(null);
    setActiveFilters({
      specialization: [],
      location: "",
      appointmentDate: null,
    });
  };

  const displayFilters = {
    location: activeFilters.location || undefined,
    date: activeFilters.appointmentDate
      ? `${activeFilters.appointmentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`
      : undefined,
    additionalCount:
      activeFilters.specialization.length > 0
        ? activeFilters.specialization.length
        : undefined,
  };

  return (
    <View className="flex-1 items-center bg-bg-secondary ">
      <SafeAreaView edges={["top", "bottom"]} />
      <View className="flex-col h-fit  w-full px-6">
        <Header userName={username} />
        <SearchBar
          value={inputSearch}
          onChangeText={(text) => setInputSearch(text)}
          onFilterPress={() => setShowFilterModal(true)}
          activeFilters={displayFilters}
          onClearFilters={handleClearFilters}
        />
      </View>
      <CategoriesSlide />
      <ListDoctors />
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
}
