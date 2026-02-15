import { TopTabs } from "@/components/base";
import BookingModal from "@/components/doctor-page/booking-modal";
import { TabTitle } from "@/components/doctor-page/tabs";
import { doctors } from "@/data/doctors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, Text } from "react-native-gesture-handler";

export default function DoctorPage() {
  const router = useRouter();
  const param = useLocalSearchParams<{ doctorId: string }>();
  const doctorId = param.doctorId;
  const doctor = doctors.find((doc) => doc.id === doctorId);
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/Aeonik/Aeonik-Medium.otf"),
    HelveticaNowDisplay: require("@/assets/fonts/Aeonik/Aeonik-Bold.otf"),
  });

  const [showBookingModal, setShowBookingModal] = useState(false);

  /* const weeksDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; */

  const today = new Date();

  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dayNumber = today.getDate();
  const monthName = today.toLocaleDateString("en-US", { month: "long" });
  const year = today.getFullYear();

  console.log({
    dayNumber,
    dayName,
    monthName,
    year,
  });

  const handleBooking = (filters: any) => {
    console.log("Applied filters:", filters);
  };
  if (!doctor) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text
          className="text-lg text-[#666]"
          style={fontLoaded && { fontFamily: "SfProRounded" }}
        >
          Doctor not found
        </Text>
      </View>
    );
  }

  const avgRating =
    doctor.reviews.reduce((sum, r) => sum + r.rating, 0) /
    doctor.reviews.length;

  const TABS = [
    {
      id: "about",
      title: "About",
      titleComponent: (isActive: boolean) => (
        <TabTitle
          icon="person.fill"
          label="About"
          isActive={isActive}
          fontLoaded={fontLoaded}
        />
      ),
      contentComponent: (
        <ScrollView
          className="flex-1 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Section */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-[#f8f9fa] text-black-text rounded-2xl p-4 items-center">
              <Text
                className="text-2xl font-bold text-black-text"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                {avgRating.toFixed(1)}
              </Text>
              <Text
                className="text-xs text-black-text/55  mt-1"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                Rating
              </Text>
            </View>
            <View className="flex-1 bg-[#f8f9fa] rounded-2xl p-4 items-center">
              <Text
                className="text-2xl font-bold text-black-text"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                {doctor.reviews.length}
              </Text>
              <Text
                className="text-xs text-black-text/55 mt-1"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                Reviews
              </Text>
            </View>
            <View className="flex-1 bg-[#f8f9fa] rounded-2xl p-4 items-center">
              <Text
                className="text-2xl font-bold text-black-text"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                10+
              </Text>
              <Text
                className="text-xs text-black-text/55 mt-1"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                Years Exp
              </Text>
            </View>
          </View>

          {/* Bio Section */}
          <View className="bg-[#f8f9fa] rounded-2xl p-4 mb-4">
            <Text
              className="text-base font-bold text-[#1a1a1a] mb-2.5"
              style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
            >
              Biography
            </Text>
            <Text
              className="text-sm text-black-text/55 leading-5.5"
              style={fontLoaded && { fontFamily: "SfProRounded" }}
            >
              {doctor.bio}
            </Text>
          </View>

          {/* Location Section */}
          {doctor.location && (
            <View className="bg-[#f8f9fa] rounded-2xl p-4 mb-4">
              <Text
                className="text-base font-bold text-[#1a1a1a] mb-2.5"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                Location
              </Text>
              <View className="flex-row items-center gap-2">
                <Ionicons name="location" size={20} color="#00B894" />
                <Text
                  className="text-sm text-[#555]"
                  style={fontLoaded && { fontFamily: "SfProRounded" }}
                >
                  {doctor.location}
                </Text>
              </View>
            </View>
          )}

          <View className="h-30" />
        </ScrollView>
      ),
    },
    {
      id: "reviews",
      title: "Reviews",
      titleComponent: (isActive: boolean) => (
        <TabTitle
          icon="star.fill"
          label="Reviews"
          isActive={isActive}
          fontLoaded={fontLoaded}
        />
      ),
      contentComponent: (
        <ScrollView
          className="flex-1 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {doctor.reviews.map((review, index) => (
            <View key={index} className="bg-[#f8f9fa] rounded-2xl p-4 mb-3">
              <View className="flex-row justify-between items-center mb-2.5">
                <View className="flex-row items-center gap-2.5">
                  <View className="w-9 h-9 rounded-[18px] bg-[#00B894] justify-center items-center">
                    <Text
                      className="text-base font-bold text-white"
                      style={
                        fontLoaded && { fontFamily: "HelveticaNowDisplay" }
                      }
                    >
                      {review.reviewerName.charAt(0)}
                    </Text>
                  </View>
                  <Text
                    className="text-sm font-medium text-[#1a1a1a]"
                    style={fontLoaded && { fontFamily: "SfProRounded" }}
                  >
                    {review.reviewerName}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text
                    className="text-sm font-bold text-[#1a1a1a]"
                    style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
                  >
                    {review.rating}
                  </Text>
                </View>
              </View>
              <Text
                className="text-sm text-[#555] leading-5"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                {review.comment}
              </Text>
            </View>
          ))}
          <View className="h-30" />
        </ScrollView>
      ),
    },
    {
      id: "experience",
      title: "Experience",
      titleComponent: (isActive: boolean) => (
        <TabTitle
          icon="person.fill"
          label="Experience"
          isActive={isActive}
          fontLoaded={fontLoaded}
        />
      ),
      contentComponent: (
        <ScrollView
          className="flex-1 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Section */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-[#f8f9fa] text-black-text rounded-2xl p-4 items-center">
              <Text
                className="text-2xl font-bold text-black-text"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                {avgRating.toFixed(1)}
              </Text>
              <Text
                className="text-xs text-black-text/55  mt-1"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                Rating
              </Text>
            </View>
            <View className="flex-1 bg-[#f8f9fa] rounded-2xl p-4 items-center">
              <Text
                className="text-2xl font-bold text-black-text"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                {doctor.reviews.length}
              </Text>
              <Text
                className="text-xs text-black-text/55 mt-1"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                Reviews
              </Text>
            </View>
            <View className="flex-1 bg-[#f8f9fa] rounded-2xl p-4 items-center">
              <Text
                className="text-2xl font-bold text-black-text"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                10+
              </Text>
              <Text
                className="text-xs text-black-text/55 mt-1"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                Years Exp
              </Text>
            </View>
          </View>

          {/* Bio Section */}
          <View className="bg-[#f8f9fa] rounded-2xl p-4 mb-4">
            <Text
              className="text-base font-bold text-[#1a1a1a] mb-2.5"
              style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
            >
              Biography
            </Text>
            <Text
              className="text-sm text-black-text/55 leading-5.5"
              style={fontLoaded && { fontFamily: "SfProRounded" }}
            >
              {doctor.bio}
            </Text>
          </View>

          {/* Location Section */}
          {doctor.location && (
            <View className="bg-[#f8f9fa] rounded-2xl p-4 mb-4">
              <Text
                className="text-base font-bold text-[#1a1a1a] mb-2.5"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                Location
              </Text>
              <View className="flex-row items-center gap-2">
                <Ionicons name="location" size={20} color="#00B894" />
                <Text
                  className="text-sm text-[#555]"
                  style={fontLoaded && { fontFamily: "SfProRounded" }}
                >
                  {doctor.location}
                </Text>
              </View>
            </View>
          )}

          <View className="h-30" />
        </ScrollView>
      ),
    },
    {
      id: "dummy",
      title: "Dummy",
      titleComponent: (isActive: boolean) => (
        <TabTitle
          icon="person.fill"
          label="Dummy"
          isActive={isActive}
          fontLoaded={fontLoaded}
        />
      ),
      contentComponent: (
        <ScrollView
          className="flex-1 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Section */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-[#f8f9fa] text-black-text rounded-2xl p-4 items-center">
              <Text
                className="text-2xl font-bold text-black-text"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                {avgRating.toFixed(1)}
              </Text>
              <Text
                className="text-xs text-black-text/55  mt-1"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                Rating
              </Text>
            </View>
            <View className="flex-1 bg-[#f8f9fa] rounded-2xl p-4 items-center">
              <Text
                className="text-2xl font-bold text-black-text"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                {doctor.reviews.length}
              </Text>
              <Text
                className="text-xs text-black-text/55 mt-1"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                Reviews
              </Text>
            </View>
            <View className="flex-1 bg-[#f8f9fa] rounded-2xl p-4 items-center">
              <Text
                className="text-2xl font-bold text-black-text"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                10+
              </Text>
              <Text
                className="text-xs text-black-text/55 mt-1"
                style={fontLoaded && { fontFamily: "SfProRounded" }}
              >
                Years Exp
              </Text>
            </View>
          </View>

          {/* Bio Section */}
          <View className="bg-[#f8f9fa] rounded-2xl p-4 mb-4">
            <Text
              className="text-base font-bold text-[#1a1a1a] mb-2.5"
              style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
            >
              Biography
            </Text>
            <Text
              className="text-sm text-black-text/55 leading-5.5"
              style={fontLoaded && { fontFamily: "SfProRounded" }}
            >
              {doctor.bio}
            </Text>
          </View>

          {/* Location Section */}
          {doctor.location && (
            <View className="bg-[#f8f9fa] rounded-2xl p-4 mb-4">
              <Text
                className="text-base font-bold text-[#1a1a1a] mb-2.5"
                style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
              >
                Location
              </Text>
              <View className="flex-row items-center gap-2">
                <Ionicons name="location" size={20} color="#00B894" />
                <Text
                  className="text-sm text-[#555]"
                  style={fontLoaded && { fontFamily: "SfProRounded" }}
                >
                  {doctor.location}
                </Text>
              </View>
            </View>
          )}

          <View className="h-30" />
        </ScrollView>
      ),
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Header Image with Overlay */}
      <View className="h-80 relative">
        <Image
          source={doctor.imageUrl}
          style={styles.headerImage}
          contentFit="cover"
          blurRadius={2}
        />

        {/* Back & Share Buttons */}
        <TouchableOpacity
          className="absolute top-12.5 left-5 w-10 h-10 rounded-full bg-white/90 justify-center items-center"
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={22} color="#1a1a1a" />
        </TouchableOpacity>
        <TouchableOpacity className="absolute top-12.5 right-5 w-10 h-10 rounded-full bg-white/90 justify-center items-center">
          <Feather name="share" size={22} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      {/* Tabs Section */}
      <GestureHandlerRootView className="flex-1 mt-px bg-bg-secondary">
        <TopTabs
          tabs={TABS}
          activeColor="#0b0b0b"
          inactiveColor="#0aa462"
          underlineColor="#0b0b0b"
          underlineHeight={3}
        />
      </GestureHandlerRootView>

      {/* Book Appointment Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-transparent p-4 pb-8 ">
        <TouchableOpacity
          className="bg-primary py-4 rounded-2xl items-center"
          onPress={() => setShowBookingModal(true)}
        >
          <Text
            className="text-base font-bold text-white"
            style={fontLoaded && { fontFamily: "HelveticaNowDisplay" }}
          >
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
      <BookingModal
        visible={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onApplyFilters={handleBooking}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: "100%",
  },
});
