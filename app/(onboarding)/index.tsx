import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { PageIndicator } from "react-native-page-indicator";

type OnboardingType = {
  id: number;
  title: string;
  description: string;
};

const onboardings: OnboardingType[] = [
  {
    id: 1,
    title: "More Comfortable Chat With the Doctor",
    description:
      "Book an appointment with doctor. Chat with doctor via appointment letter and get consultation.",
  },
  {
    id: 2,
    title: "Find the Best Doctor for Your Needs",
    description:
      "Search and connect with top-rated specialists in your area. Read reviews and choose the perfect match.",
  },
  {
    id: 3,
    title: "Easy Appointment Scheduling",
    description:
      "Schedule appointments with just a few taps. Get reminders and manage your health journey effortlessly.",
  },
];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  /* const router = useRouter(); */
  const logged = true;
  if (logged) {
    /*  router.replace("/(home)/calendar"); */
  }
  const item = onboardings[currentIndex];
  const handleNext = () => {
    if (currentIndex < onboardings.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      /* router.replace("/(home)/home"); */
      console.log("Onboarding finished");
    }
  };
  return (
    <View className="flex-1 relative items-center bg-[#3D3EB0]  ">
      <View className=" mt-20 ">
        <Image source={require("../../assets/images/Image.png")} />
      </View>
      <Image
        source={require("../../assets/images/Texture.png")}
        className="absolute"
      />
      <View className=" bg-white h-96 w-full rounded-t-3xl">
        <View className="flex flex-col items-center mt-10 px-12">
          <View className="">
            <Text className="text-2xl font-bold text-center">{item.title}</Text>
            <Text className="text-base text-center text-gray-600 mt-4">
              {item.description}
            </Text>
            <View className="mt-6 flex flex-row justify-center">
              <PageIndicator
                count={onboardings.length}
                current={currentIndex}
                color="#3D3EB0"
              />
            </View>
          </View>

          <View className="mt-6 w-full">
            <TouchableOpacity
              onPress={handleNext}
              className="bg-[#4C4DDC] py-5 rounded-2xl"
            >
              <Text className="text-white text-center font-semibold text-base">
                {currentIndex === onboardings.length - 1
                  ? "Get Started"
                  : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
