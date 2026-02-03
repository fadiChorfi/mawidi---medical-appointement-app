import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
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

type Category = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  {
    id: 1,
    name: "Dentist",
    icon: <MaterialCommunityIcons name="tooth" size={24} color="#3D3EB0" />,
  },
  {
    id: 2,
    name: "Heart",
    icon: <FontAwesome name="heartbeat" size={24} color="#3D3EB0" />,
  },
  {
    id: 3,
    name: "Brain",
    icon: <FontAwesome5 name="brain" size={24} color="#3D3EB0" />,
  },
  {
    id: 4,
    name: "Lungs",
    icon: <FontAwesome6 name="lungs" size={24} color="#3D3EB0" />,
  },
  {
    id: 5,
    name: "Brain",
    icon: <FontAwesome5 name="brain" size={24} color="#3D3EB0" />,
  },
  {
    id: 6,
    name: "Lungs",
    icon: <FontAwesome6 name="lungs" size={24} color="#3D3EB0" />,
  },
];

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: any;
  numberOfReviews?: number;
  isFav?: boolean;
  numOfPatients?: number;
  yearsOfExperience?: number;
  reviews?: number;
  about?: string;
};

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    image: require("../../assets/images/doc1.png"),
    numberOfReviews: 150,
    isFav: true,
  },
  {
    id: 2,
    name: "Dr. Emily Chen",
    specialty: "Neurologist",
    rating: 4.8,
    image: require("../../assets/images/doc2.png"),
    numberOfReviews: 120,
    isFav: true,
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    specialty: "Neurologist",
    rating: 4.8,
    image: require("../../assets/images/doc2.png"),
    numberOfReviews: 120,
    isFav: false,
  },
  {
    id: 4,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    image: require("../../assets/images/doc1.png"),
    numberOfReviews: 120,
    isFav: false,
  },
];

function Home() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView edges={["top"]}>
        <View className="w-full py-6 bg-[#3D3EB0] rounded-b-4xl">
          <View className="flex-row justify-between items-center ">
            <View className="flex-col ">
              <View className="flex-row gap-4 items-center px-6 py-4 mt-4">
                <Image
                  source={require("../../assets/images/avatar.png")}
                  style={{ height: 48, width: 48 }}
                />
                <View className="flex-col gap">
                  <Text className="text-white text-sm ">Hello, Welcome 🎉</Text>
                  <Text className="text-white text-[1.25rem] font-semibold ">
                    Savannah Nguyen
                  </Text>
                </View>
              </View>
            </View>
            <View className="mr-6 mt-4 relative">
              <Octicons name="bell" size={28} color="white" />
              <View className="bg-red-500 w-3 h-3 rounded-full absolute top-0 right-0 " />
            </View>
          </View>
          <View className="px-6 mb-4">
            <View className="border border-white/20 flex-row items-center px-4  rounded-2xl">
              <Octicons name="search" size={20} color="#9CA3AF" />

              <TextInput
                placeholder="Search Doctors, Labs, etc ..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 ml-2 text-base"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <FlashList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row gap-1.5   border border-white/60 items-center justify-center  m-2 p-4 rounded-2xl shadow-md"
            >
              {item.icon}
              <Text className=" text-base font-medium">{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <View className="flex-col  mt-6">
          <View className="flex-row px-6 justify-between items-baseline">
            <Text className="text-xl font-medium">Favourite Doctors</Text>
            <Pressable>
              <Text className="text-base text-[#3D3EB0] ">See All</Text>
            </Pressable>
          </View>
          <View className="flex-row px-3 mt-4 gap-4">
            {doctors
              .filter((doc) => doc.isFav)
              .map((item) => (
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/doctor/[docID]",
                      params: { docID: item.id.toString() },
                    });
                  }}
                  activeOpacity={0.7}
                  key={item.id}
                  className="flex-col  gap-1.5 border border-white/60   rounded-2xl overflow-hidden shadow-md bg-white"
                >
                  <Image
                    source={item.image}
                    className="  h-40 w-44 "
                    resizeMode="cover"
                  />

                  <View className="flex-col px-3 py-2 w-full">
                    <Text className="text-base font-medium">{item.name}</Text>

                    <Text className="text-sm text-gray-500">
                      {item.specialty}
                    </Text>

                    <Text className="text-sm text-yellow-500">
                      ⭐ {item.rating}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <View className="flex-col  mt-6">
          <View className="flex-row px-6 justify-between items-baseline">
            <Text className="text-xl font-medium">Top Doctors</Text>
            <Pressable>
              <Text className="text-base text-[#3D3EB0] ">See All</Text>
            </Pressable>
          </View>
          <View className="flex-col px-3 mt-4 gap-4">
            {doctors.map((item) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/doctor/[docID]",
                    params: { docID: item.id.toString() },
                  })
                }
                key={item.id}
                activeOpacity={0.7}
                className="flex-row border border-white/60 rounded-2xl overflow-hidden shadow-md bg-white"
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
                        <Feather
                          name="more-horizontal"
                          size={24}
                          color="black"
                        />
                      </Pressable>
                    </View>
                    <Text className="text-sm text-gray-500">
                      {item.specialty}
                    </Text>
                  </View>
                  <View>
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
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
