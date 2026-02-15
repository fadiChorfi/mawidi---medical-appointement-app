import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: BookingOptions) => void;
}

export interface BookingOptions {
  specialization: string[];
  location: string;
  appointmentDate: Date | null;
}

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function generateTimeSlots(startHour = 8, endHour = 17, interval = 30) {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let min = 0; min < 60; min += interval) {
      if (hour === endHour && min > 0) break;
      const h = hour % 12 === 0 ? 12 : hour % 12;
      const ampm = hour < 12 ? "AM" : "PM";
      const m = min === 0 ? "00" : min.toString().padStart(2, "0");
      slots.push(`${h}:${m} ${ampm}`);
    }
  }
  return slots;
}

const bookedTimeSlots = ["10:00 AM", "2:30 PM"];

const TimeSlots = generateTimeSlots();

export default function BookingModal({
  visible,
  onClose,
  onApplyFilters,
}: BookingModalProps) {
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);

  const toggleSpecialization = (spec: string) => {
    if (spec === "All Specializations") {
      setSelectedSpecializations([]);
    } else {
      setSelectedSpecializations((prev) =>
        prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec],
      );
    }
  };

  const handleApply = () => {
    onApplyFilters({
      specialization: selectedSpecializations,
      location: selectedLocation,
      appointmentDate,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedSpecializations([]);
    setSelectedLocation("");
    setAppointmentDate(null);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50" onPress={onClose}>
        <Pressable
          className="absolute bottom-0 w-full bg-white rounded-t-3xl"
          style={{ maxHeight: "85%" }}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
            <Text className="text-xl font-family-bold text-black-text">
              Booking Appointement
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#0b0b0b" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-6 py-4">
            {/* Specialization Section */}
            <View className="mb-6">
              <Text className="text-base font-family-bold text-black-text mb-3">
                Date
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {Days.map((spec) => (
                  <TouchableOpacity
                    key={spec}
                    onPress={() => toggleSpecialization(spec)}
                    className={`px-4 py-2 rounded-full border ${
                      spec === "All Specializations" &&
                      selectedSpecializations.length === 0
                        ? "bg-green border-green"
                        : selectedSpecializations.includes(spec)
                          ? "bg-green border-green"
                          : "bg-white border-gray-300"
                    }`}
                  >
                    <Text
                      className={`text-sm font-family-medium ${
                        spec === "All Specializations" &&
                        selectedSpecializations.length === 0
                          ? "text-white"
                          : selectedSpecializations.includes(spec)
                            ? "text-white"
                            : "text-gray-text"
                      }`}
                    >
                      {spec}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Location Section */}
            <View className="mb-6">
              <Text className="text-base font-family-bold text-black-text mb-3">
                Time
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {TimeSlots.map((loc) => (
                  <TouchableOpacity
                    key={loc}
                    onPress={() =>
                      setSelectedLocation(loc === "All Locations" ? "" : loc)
                    }
                    className={`px-4 py-2 rounded-full border ${
                      (loc === "All Locations" && selectedLocation === "") ||
                      selectedLocation === loc
                        ? "bg-green border-green"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {
                      <Text
                        className={`text-sm font-family-medium ${
                          (loc === "All Locations" &&
                            selectedLocation === "") ||
                          selectedLocation === loc
                            ? "text-white"
                            : "text-gray-text"
                        }`}
                      >
                        {loc} {bookedTimeSlots.includes(loc) && "(Booked)"}
                      </Text>
                    }
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View className="flex-row gap-3 p-6 border-t border-gray-200">
            <TouchableOpacity
              onPress={handleReset}
              className="flex-1 bg-gray-100 rounded-2xl py-4 items-center"
            >
              <Text className="text-base font-family-bold text-gray-text">
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleApply}
              className="flex-1 bg-green rounded-2xl py-4 items-center"
            >
              <Text className="text-base font-family-bold text-white">
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
