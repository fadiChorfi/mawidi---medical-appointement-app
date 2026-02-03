import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doctors } from "../(home)/home";

export default function DoctorPage() {
  const { docID } = useLocalSearchParams<{ docID: string }>();
  const doctor = doctors.find((doc) => doc.id === Number(docID));

  if (!doctor) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Doctor not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen
        options={{
          title: "My Appointment",
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <SafeAreaView edges={["top"]} />

      {/* Doctor Image Card */}
      <View className="mx-4 mt-16 bg-[#E8E8F4] rounded-3xl overflow-hidden">
        <View className="items-center pt-4">
          <Image
            source={doctor.image}
            className="w-full h-48"
            resizeMode="contain"
          />
        </View>

        {/* Name, Specialty & Rating */}
        <View className="bg-white px-4 py-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">
                {doctor.name}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                {doctor.specialty} | Vcare Clinic
              </Text>
            </View>
            <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
              <Text className="text-yellow-500">⭐</Text>
              <Text className="text-sm font-semibold text-gray-700 ml-1">
                {doctor.rating}
              </Text>
              <Text className="text-xs text-gray-400 ml-1">
                ({doctor.numberOfReviews} reviews)
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View className="flex-row justify-around mx-4 mt-6 py-4 bg-white rounded-2xl">
        <View className="items-center">
          <View className="bg-[#E8E8F4] p-3 rounded-full mb-2">
            <MaterialCommunityIcons
              name="account-group-outline"
              size={24}
              color="#3D3EB0"
            />
          </View>
          <Text className="text-lg font-bold text-gray-900">
            {doctor.numberOfReviews || 120}+
          </Text>
          <Text className="text-xs text-gray-500">Patients</Text>
        </View>
        <View className="items-center">
          <View className="bg-[#E8E8F4] p-3 rounded-full mb-2">
            <Feather name="award" size={24} color="#3D3EB0" />
          </View>
          <Text className="text-lg font-bold text-gray-900">7+</Text>
          <Text className="text-xs text-gray-500">Years Exp</Text>
        </View>
        <View className="items-center">
          <View className="bg-[#E8E8F4] p-3 rounded-full mb-2">
            <Ionicons name="star-outline" size={24} color="#3D3EB0" />
          </View>
          <Text className="text-lg font-bold text-gray-900">
            {doctor.rating}
          </Text>
          <Text className="text-xs text-gray-500">Rating</Text>
        </View>
        <View className="items-center">
          <View className="bg-[#E8E8F4] p-3 rounded-full mb-2">
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color="#3D3EB0"
            />
          </View>
          <Text className="text-lg font-bold text-gray-900">100+</Text>
          <Text className="text-xs text-gray-500">Reviews</Text>
        </View>
      </View>

      {/* About Me Section */}
      <ScrollView className="flex-1 mx-4 mt-6">
        <Text className="text-lg font-semibold text-gray-900">About Me</Text>
        <Text className="text-gray-500 mt-2 leading-6">
          {doctor.name} is the top most {doctor.specialty.toLowerCase()}{" "}
          specialist in Crist Hospital in London, UK.{" "}
          <Text className="text-[#3D3EB0]">Read More...</Text>
        </Text>
      </ScrollView>

      {/* Book Appointment Button */}
      <View className="px-4 pb-8">
        <Pressable className="bg-[#3D3EB0] py-4 rounded-2xl flex-row items-center justify-center">
          <Feather name="phone-call" size={20} color="white" />
          <Text className="text-white font-semibold text-base ml-2">
            Voice Call (14.30 - 15.00 PM)
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
