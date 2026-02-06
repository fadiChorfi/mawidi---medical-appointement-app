import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories, doctors } from "./(home)/home";

export default function FilterByCategoryId() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  const category = categories.find((cat) => cat.id === Number(categoryId));

  const filteredDoctors = doctors.filter((doc) =>
    doc.specialty.toLowerCase().includes(category?.name.toLowerCase() || ""),
  );

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView edges={["top"]}>
        <View className="flex flex-col gap-4 w-full py-4 px-5 bg-[#3D3EB0]">
          <View className="flex-row items-center justify-between mt-2">
            <Pressable
              onPress={() => router.back()}
              className="bg-white/10 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text className="text-white text-xl font-semibold">
              {category?.name || "Category"}
            </Text>
            <View className="w-10" />
          </View>

          <View className="border border-white/20 flex-row items-center px-4 rounded-2xl mb-2">
            <Octicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder={`Search ${category?.name || ""} doctors...`}
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-2 text-base text-white py-3"
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row px-5 justify-between items-center mb-4">
          <Text className="text-lg font-medium text-gray-800">
            {filteredDoctors.length} Doctor{filteredDoctors.length !== 1 && "s"}{" "}
            Found
          </Text>
          <Pressable className="flex-row items-center gap-1">
            <Feather name="sliders" size={18} color="#3D3EB0" />
            <Text className="text-[#3D3EB0] font-medium">Filter</Text>
          </Pressable>
        </View>

        {filteredDoctors.length > 0 ? (
          <View className="flex-col px-4 gap-4">
            {filteredDoctors.map((item) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/doctor/[docID]",
                    params: { docID: item.id.toString() },
                  })
                }
                key={item.id}
                activeOpacity={0.7}
                className="flex-row border border-gray-100 rounded-2xl overflow-hidden shadow-md bg-white"
              >
                <Image
                  source={item.image}
                  className="h-28 w-28"
                  resizeMode="cover"
                />
                <View className="flex-1 flex-col justify-between px-3 py-2">
                  <View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-base font-medium">{item.name}</Text>
                      <Pressable>
                        <Ionicons
                          name={item.isFav ? "heart" : "heart-outline"}
                          size={22}
                          color={item.isFav ? "#EF4444" : "#9CA3AF"}
                        />
                      </Pressable>
                    </View>
                    <Text className="text-sm text-gray-500">
                      {item.specialty}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-yellow-500">
                      ⭐ {item.rating}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {item.numberOfReviews} Reviews
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <View className="bg-gray-100 p-6 rounded-full mb-4">
              <Feather name="search" size={48} color="#9CA3AF" />
            </View>
            <Text className="text-xl font-semibold text-gray-800 mb-2">
              No Doctors Found
            </Text>
            <Text className="text-gray-500 text-center px-8">
              We couldn&apos;t find any {category?.name} specialists at the
              moment.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
