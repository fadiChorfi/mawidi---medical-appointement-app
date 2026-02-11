import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  specialization: string[];
  location: string;
  appointmentDate: Date | null;
}

const SPECIALIZATIONS = [
  "All Specializations",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Dentist",
  "Orthopedic",
];

const LOCATIONS = [
  "All Locations",
  "New York, NY",
  "Brooklyn, NY",
  "Manhattan, NY",
  "Queens, NY",
  "Bronx, NY",
  "Staten Island, NY",
];

export default function FilterModal({
  visible,
  onClose,
  onApplyFilters,
}: FilterModalProps) {
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
            <Text className="text-xl font-family-bold text-black-text">
              Filter Search
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#0b0b0b" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-6 py-4">
            {/* Specialization Section */}
            <View className="mb-6">
              <Text className="text-base font-family-bold text-black-text mb-3">
                Specialization
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {SPECIALIZATIONS.map((spec) => (
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
                Location
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {LOCATIONS.map((loc) => (
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
                    <Text
                      className={`text-sm font-family-medium ${
                        (loc === "All Locations" && selectedLocation === "") ||
                        selectedLocation === loc
                          ? "text-white"
                          : "text-gray-text"
                      }`}
                    >
                      {loc}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Appointment Date Section */}
            <View className="mb-6">
              <Text className="text-base font-family-bold text-black-text mb-3">
                Appointment Date
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="flex-row items-center justify-between bg-white border border-gray-300 rounded-2xl px-4 py-3"
              >
                <View className="flex-row items-center gap-2">
                  <Feather name="calendar" size={20} color="#10B981" />
                  <Text
                    className={`text-base font-family-regular ${
                      appointmentDate ? "text-black-text" : "text-gray-text"
                    }`}
                  >
                    {appointmentDate
                      ? appointmentDate.toLocaleDateString()
                      : "Select date"}
                  </Text>
                </View>
                {appointmentDate && (
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      setAppointmentDate(null);
                    }}
                  >
                    <Feather name="x-circle" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={appointmentDate || new Date()}
                  mode="date"
                  display="default"
                  minimumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setAppointmentDate(selectedDate);
                    }
                  }}
                />
              )}
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
