import { doctors } from "@/data/doctors";
import Feather from "@expo/vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FilterOptions } from "./FilterModal";

interface ListDoctorsProps {
  searchQuery?: string | null;
  filters?: FilterOptions;
}

export default function ListDoctors({
  searchQuery = null,
  filters = { specialization: [], location: "", appointmentDate: null },
}: ListDoctorsProps = {}) {
  const router = useRouter();
  const filteredDoctors = useMemo(() => {
    let results = [...doctors];

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          (doctor.location && doctor.location.toLowerCase().includes(query)) ||
          (typeof doctor.specialization === "string" &&
            doctor.specialization.toLowerCase().includes(query)),
      );
    }

    if (filters?.specialization && filters.specialization.length > 0) {
      results = results.filter((doctor) => {
        if (typeof doctor.specialization === "string") {
          return filters.specialization.includes(doctor.specialization);
        }
        return false;
      });
    }

    if (filters?.location && filters.location.trim()) {
      results = results.filter(
        (doctor) =>
          doctor.location &&
          doctor.location
            .toLowerCase()
            .includes(filters.location.toLowerCase()),
      );
    }

    if (filters?.appointmentDate) {
      console.log("Filter by date:", filters.appointmentDate);
    }

    return results;
  }, [searchQuery, filters]);

  return (
    <View
      className="flex-1 pb-12 flex-col gap-4 w-full items-center  mt-6"
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
          data={filteredDoctors}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/doctor/[doctorId]",
                  params: { doctorId: item.id },
                })
              }
              activeOpacity={0.7}
              className="w-full mb-4 bg-[white]  rounded-xl overflow-hidden flex-row  shadow-xs border border-black-text/5"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 0.5,
                height: 120,
              }}
            >
              <View className="w-28 p-2">
                <Image
                  source={item.imageUrl}
                  style={{ width: "100%", height: "100%", borderRadius: 12 }}
                  contentFit="cover"
                />
              </View>

              <View className="flex-1 py-2 pr-3   ">
                <View className="flex-1  justify-between">
                  <View className="flex  flex-row justify-between items-center">
                    <Text className="text-base font-family-bold text-black-text mb">
                      {item.name}
                    </Text>
                    <View className="">
                      <TouchableOpacity>
                        <Feather name="heart" size={24} color="#CBD5E1" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View className="flex flex-col gap-2 ">
                    <View className="flex-row items-center gap-1">
                      <Feather name="heart" size={12} color="#94A3B8" />
                      <Text className="text-xs font-family-regular text-gray-text">
                        {item.specialization}
                      </Text>
                    </View>
                    {item.location && (
                      <View className="flex-row items-center gap-1">
                        <Feather name="map-pin" size={12} color="#94A3B8" />
                        <Text className="text-xs font-family-regular text-gray-text">
                          {item.location}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-row items-center gap-2   ">
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
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
