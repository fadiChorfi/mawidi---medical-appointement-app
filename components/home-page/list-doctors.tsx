import Feather from "@expo/vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type CardDoctorsProps = {
  id: string;
  name: string;
  specialization: string | string[];
  imageUrl: unknown;
  location?: string;
  bio: string;
  reviews: {
    rating: number;
    comment: string;
    reviewerName: string;
  }[];
};

const doctors: CardDoctorsProps[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    location: "New York, NY - 2.5 km",
    imageUrl: "",
    bio: "Experienced cardiologist with 15 years of practice specializing in heart disease prevention and treatment.",
    reviews: [
      {
        rating: 5,
        comment: "Excellent doctor, very thorough and caring.",
        reviewerName: "John Smith",
      },
      {
        rating: 4.5,
        comment: "Great experience, highly recommend!",
        reviewerName: "Emily Davis",
      },
    ],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Dermatologist",
    location: "Brooklyn, NY - 3.1 km",
    imageUrl: "",
    bio: "Board-certified dermatologist focusing on skin health, cosmetic procedures, and skin cancer treatment.",
    reviews: [
      {
        rating: 5,
        comment: "Very professional and knowledgeable.",
        reviewerName: "Maria Garcia",
      },
      {
        rating: 4.8,
        comment: "Helped me with my skin condition effectively.",
        reviewerName: "Robert Wilson",
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Amanda Williams",
    specialization: "Pediatrician",
    location: "Manhattan, NY - 1.8 km",
    imageUrl: "",
    bio: "Compassionate pediatrician dedicated to children's health and development with 10+ years of experience.",
    reviews: [
      {
        rating: 5,
        comment: "My kids love her! Very patient and caring.",
        reviewerName: "Lisa Brown",
      },
      {
        rating: 5,
        comment: "Best pediatrician we've ever had.",
        reviewerName: "David Martinez",
      },
    ],
  },
  {
    id: "4",
    name: "Dr. James Anderson",
    specialization: "Neurologist",
    location: "Queens, NY - 4.2 km",
    imageUrl: "",
    bio: "Specialist in neurological disorders with expertise in migraine treatment and epilepsy management.",
    reviews: [
      {
        rating: 4.7,
        comment: "Very thorough examination and clear explanations.",
        reviewerName: "Patricia Taylor",
      },
      {
        rating: 4.9,
        comment: "Helped me manage my condition effectively.",
        reviewerName: "Christopher Lee",
      },
    ],
  },
  {
    id: "5",
    name: "Dr. Emma Thompson",
    specialization: "Dentist",
    location: "Bronx, NY - 3.7 km",
    imageUrl: "",
    bio: "General dentist providing comprehensive dental care including preventive, restorative, and cosmetic dentistry.",
    reviews: [
      {
        rating: 5,
        comment: "Pain-free experience, highly skilled!",
        reviewerName: "Jessica White",
      },
      {
        rating: 4.8,
        comment: "Great at making patients feel comfortable.",
        reviewerName: "Matthew Harris",
      },
    ],
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    specialization: "Orthopedic",
    location: "Staten Island, NY - 5.3 km",
    imageUrl: "",
    bio: "Orthopedic surgeon specializing in sports injuries, joint replacement, and trauma care.",
    reviews: [
      {
        rating: 5,
        comment: "Excellent surgeon, my knee is better than ever!",
        reviewerName: "Steven Clark",
      },
      {
        rating: 4.9,
        comment: "Very knowledgeable and caring doctor.",
        reviewerName: "Jennifer Lewis",
      },
    ],
  },
];

export default function ListDoctors() {
  return (
    <View
      className="flex flex-col gap-4 w-full items-center mt-6"
      style={{ height: 400 }}
    >
      <View className="flex-row items-baseline justify-between w-full px-6 ">
        <Text className=" text-lg font-family-bold text-black-text ">
          Nearest Doctors
        </Text>
        <TouchableOpacity
          onPress={() => console.log("this should navigate to see all page")}
        >
          <Text className="text-md font-family-regular text-black-text ">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full h-full px-6">
        <FlashList
          data={doctors}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-full mb-4 bg-white rounded-2xl overflow-hidden flex-row"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
                height: 120,
              }}
            >
              {/* Doctor Image - Full height */}
              <View className="w-28 p-1">
                <Image
                  source={require("@/assets/images/doctor1.png")}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
              </View>

              {/* Doctor Info */}
              <View className="flex-1 px-4 justify-center ">
                <View>
                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-base font-family-bold text-black-text mb-1">
                      {item.name}
                    </Text>
                    <View className="p-3">
                      <TouchableOpacity>
                        <Feather name="heart" size={20} color="#CBD5E1" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text className="text-sm font-family-regular text-gray-text mb-1">
                    {item.specialization}
                  </Text>
                  {item.location && (
                    <View className="flex-row items-center gap-1 mb-2">
                      <Feather name="map-pin" size={12} color="#94A3B8" />
                      <Text className="text-xs font-family-regular text-gray-text">
                        {item.location}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Rating & Reviews */}
                <View className="flex-row items-center gap-2">
                  <View className="flex-row items-center gap-1">
                    <Feather name="star" size={14} color="#FFA726" />
                    <Text className="text-sm font-family-medium text-black-text">
                      {(
                        item.reviews.reduce((acc, r) => acc + r.rating, 0) /
                        item.reviews.length
                      ).toFixed(1)}
                    </Text>
                  </View>
                  <Text className="text-sm font-family-regular text-gray-text">
                    ({item.reviews.length} reviews)
                  </Text>
                </View>
              </View>

              {/* Favorite Button */}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
