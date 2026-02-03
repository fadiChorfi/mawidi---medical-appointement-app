import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doctors } from "../(home)/home";

const IconFamilies = {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
} as const;

type IconFamily = keyof typeof IconFamilies;

const stats = [
  {
    icon: "users",
    label: "Patients",
    value: "numOfPatients",
    family: "Feather" as IconFamily,
  },
  {
    icon: "arrow-trend-up",
    label: "Experience",
    value: "yearsOfExperience",
    family: "FontAwesome6" as IconFamily,
  },
  {
    icon: "star-outlined",
    label: "Rating",
    value: "rating",
    family: "Entypo" as IconFamily,
  },
  {
    icon: "message-text-outline",
    label: "Reviews",
    value: "numberOfReviews",
    family: "MaterialCommunityIcons" as IconFamily,
  },
];

export default function DoctorPage() {
  const { docID } = useLocalSearchParams<{ docID: string }>();
  const [expanded, setExpanded] = useState(false);

  const doctor = doctors.find((doc) => doc.id === Number(docID));

  if (!doctor) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Doctor not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "My Appointment",
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <SafeAreaView edges={["top"]} />

      <View className=" flex flex-col gap-9 w-full h-full pt-20 px-6 ">
        <View className="flex flex-col items-center  rounded-md  overflow-hidden  shadow-2xs ">
          <Image
            source={require("../../assets/images/doc3.png")}
            className=" w-full h-64 object-cover "
          />

          <View className="flex flex-row justify-between items-center w-full  bg-white">
            <View className="flex flex-col">
              <Text className="text-lg font-bold text-gray-800 mt-4 ml-4">
                {doctor.name}
              </Text>
              <Text className="text-md text-gray-600 ml-4 mb-4">
                {doctor.specialty}
              </Text>
            </View>
            <View>
              <Text className="text-md  font-semibold mr-4">
                ⭐{doctor.rating} - {doctor.numberOfReviews} Reviews
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between gap-3 ">
          {stats.map((item, index) => {
            const IconComponent = IconFamilies[item.family];
            const value = doctor[item.value as keyof typeof doctor];
            return (
              <View key={index} className="items-center text-center">
                <View className="w-16 h-16 rounded-full bg-slate-100 justify-center items-center mb-2">
                  <IconComponent
                    name={item.icon as any}
                    size={24}
                    color="#3D3EB0"
                  />{" "}
                </View>

                <Text className="text-black text-lg font-semibold text-center">
                  {value}
                  {item.value !== "rating" && " +"}
                </Text>
                <Text className="text-black/40 text-center text-sm">
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>

        <View className="flex flex-col gap-2">
          <Text className="text-2xl text-black font-semibold  ">About Me</Text>
          <View className="text-left">
            <Text
              className="text-gray-700 text-base leading-relaxed"
              numberOfLines={expanded ? undefined : 2}
              ellipsizeMode="tail"
            >
              {doctor.about}
            </Text>

            <Text
              className="text-[#3D3EB0] text-sm font-medium mt-1"
              onPress={() => setExpanded(!expanded)}
            >
              {expanded ? "Read less" : "Read more"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-[#4C4DDC] py-3 rounded-lg items-center"
          onPress={() => console.log("call")}
        >
          <Text className="text-white font-semibold text-base">
            Voice Call (14:30 - 15:00 PM)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
