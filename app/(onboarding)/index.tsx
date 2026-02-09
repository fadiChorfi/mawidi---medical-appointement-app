import { useOnboarding } from "@/utils/onboarding-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { PageIndicator } from "react-native-page-indicator";
import { SafeAreaView } from "react-native-safe-area-context";

const pages = [
  {
    title: "Know your blood type",
    description: "Understanding your type saves lives",
    image: require("../../assets/images/guy-green.png"),
    mainTitle: "Real-Time Kios Updates",
    mainDescription:
      "Stay informed with instant notifications on your phone, ensuring you never miss important updates from Kios, whether it's appointment reminders, health tips, or new features.",
    showCircle: true,
    circlePosition: "bottom",
  },
  {
    title: "Schedule appointments",
    description: "Book with your favorite doctors easily",
    image: require("../../assets/images/peoples.png"),
    mainTitle: "Easy Appointment Booking",
    mainDescription:
      "Book appointments with your preferred doctors in just a few taps. Manage your schedule and receive timely reminders for all your medical visits.",
    showCircle: false,
    circlePosition: "top",
  },
  {
    title: "Track your health",
    description: "Monitor your medical records in one place",
    image: require("../../assets/images/hand-holds-phone.png"),
    mainTitle: "Complete Health Tracking",
    mainDescription:
      "Keep all your medical records, prescriptions, and health data organized in one secure place. Access your health information anytime, anywhere.",
    showCircle: true,
    circlePosition: "bottom",
  },
];

export default function OnboardingIndex() {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
  const scrollViewRef = useRef<any>(null);
  const currentPageRef = useRef(0);
  const { completeOnboarding } = useOnboarding();
  const router = useRouter();

  const handleNext = async () => {
    const nextPage = currentPageRef.current + 1;
    if (nextPage < pages.length) {
      scrollViewRef.current?.scrollTo({ x: width * nextPage, animated: true });
      currentPageRef.current = nextPage;
    } else {
      await completeOnboarding();
      router.replace("/(auth)/sign-in");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollEnd={(event) => {
          const pageIndex = Math.round(
            event.nativeEvent.contentOffset.x / width,
          );
          currentPageRef.current = pageIndex;
        }}
      >
        {pages.map((page, index) => (
          <View key={index} style={{ width, flex: 1 }}>
            <View className="flex-1 flex-col items-center pt-6">
              <View className="w-full items-center mb-8">
                <View className="w-full relative items-center overflow-hidden">
                  {page.showCircle && page.circlePosition === "bottom" && (
                    <View className="absolute -bottom-12 w-72 h-72 rounded-full bg-primary border-2 border-white" />
                  )}
                  {page.showCircle && page.circlePosition === "top" && (
                    <View className="absolute -top-12 w-72 h-72 rounded-full bg-secondary border-2 border-white" />
                  )}
                  <Image
                    source={page.image}
                    style={{
                      width: 300,
                      height: 300,
                      zIndex: 10,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 5,
                    }}
                    placeholder={{ blurhash }}
                    contentFit="contain"
                  />
                </View>
              </View>

              <View className="px-8 mt-12 items-center">
                <Text
                  style={{ fontFamily: "Aeonik-Bold" }}
                  className="text-3xl text-primary text-center mb-4 leading-tight"
                >
                  {page.mainTitle}
                </Text>
                <Text
                  style={{ fontFamily: "Aeonik-Regular" }}
                  className="text-base text-gray-600 text-center leading-7 px-2"
                >
                  {page.mainDescription}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.pageIndicatorContainer}>
        <PageIndicator
          count={pages.length}
          current={animatedCurrent}
          color="#d1d5db"
          activeColor="#20504b"
        />
      </View>

      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-primary rounded-2xl py-5 px-6 items-center justify-center shadow-lg flex-row"
          activeOpacity={0.8}
        >
          <Text
            style={{ fontFamily: "Aeonik-Bold" }}
            className="text-white text-lg mr-2"
          >
            Next
          </Text>
          <Text className="text-white text-xl">→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageIndicatorContainer: {
    position: "absolute",
    bottom: 140,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
