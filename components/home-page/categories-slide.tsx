import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CategoiesSlideProps = {
  id: string;
  name: string;
  imageUrl: undefined;
};

const categories: CategoiesSlideProps[] = [
  {
    id: "1",
    name: "Dentist",
    imageUrl: require("@/assets/images/categories/tooth.png"),
  },
  {
    id: "2",
    name: "Cardiologist",
    imageUrl: require("@/assets/images/categories/heart.png"),
  },
  {
    id: "3",
    name: "Dermatologist",
    imageUrl: require("@/assets/images/categories/Dermatologist.png"),
  },
  {
    id: "4",
    name: "Pediatrician",
    imageUrl: require("@/assets/images/categories/pediatrician.png"),
  },
  {
    id: "5",
    name: "Neurologist",
    imageUrl: require("@/assets/images/categories/neurologist.png"),
  },
  {
    id: "6",
    name: "Orthopedic",
    imageUrl: require("@/assets/images/categories/orthopedics.png"),
  },
];

export default function CategoriesSlide() {
  return (
    <View className="flex flex-col gap-4 w-full items-center   mt-6">
      <View className="flex-row items-baseline justify-between w-full px-6 ">
        <Text className=" text-lg font-family-bold text-black-text ">
          Categories
        </Text>
        <TouchableOpacity
          onPress={() => console.log("this should navigate to see all page")}
        >
          <Text className="text-md font-family-regular text-black-text ">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full h-fit ">
        <FlashList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              className="border border-green/40  ml-4 shadow-md flex flex-col items-center justify-center p-4 rounded-2xl "
              style={{ width: 125 }}
            >
              <Image
                source={item.imageUrl}
                style={{ width: 36, height: 36 }}
                contentFit="contain"
              />
              <Text className="text-sm font-family-regular text-black-text mt-2 text-center">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
