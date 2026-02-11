import { FilterOptions } from "@/components/home-page/FilterModal";
import { CardDoctorsProps } from "@/components/home-page/list-doctors";

/**
 * Filter doctors based on search query and filter options
 */
export function filterDoctors(
  doctors: CardDoctorsProps[],
  searchQuery: string,
  filters: FilterOptions,
): CardDoctorsProps[] {
  let filteredDoctors = [...doctors];

  // Filter by search query (name or location)
  if (searchQuery && searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filteredDoctors = filteredDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        (doctor.location && doctor.location.toLowerCase().includes(query)) ||
        (typeof doctor.specialization === "string" &&
          doctor.specialization.toLowerCase().includes(query)),
    );
  }

  // Filter by specialization
  if (filters.specialization && filters.specialization.length > 0) {
    filteredDoctors = filteredDoctors.filter((doctor) => {
      if (typeof doctor.specialization === "string") {
        return filters.specialization.includes(doctor.specialization);
      } else if (Array.isArray(doctor.specialization)) {
        return doctor.specialization.some((spec) =>
          filters.specialization.includes(spec),
        );
      }
      return false;
    });
  }

  // Filter by location
  if (filters.location && filters.location.trim() !== "") {
    filteredDoctors = filteredDoctors.filter(
      (doctor) =>
        doctor.location &&
        doctor.location.toLowerCase().includes(filters.location.toLowerCase()),
    );
  }

  // Filter by appointment date
  // Note: This is a placeholder. In a real app, you'd check doctor availability
  // against your appointment/scheduling system
  if (filters.appointmentDate) {
    // Example: Filter doctors who have availability on the selected date
    // This would typically involve checking against a scheduling API
    console.log("Filtering by date:", filters.appointmentDate);
    // filteredDoctors = filteredDoctors.filter(doctor => {
    //   return checkDoctorAvailability(doctor.id, filters.appointmentDate);
    // });
  }

  return filteredDoctors;
}

/**
 * Get active filter count for UI badge display
 */
export function getActiveFilterCount(filters: FilterOptions): number {
  let count = 0;

  if (filters.specialization && filters.specialization.length > 0) {
    count++;
  }

  if (filters.location && filters.location.trim() !== "") {
    count++;
  }

  if (filters.appointmentDate) {
    count++;
  }

  return count;
}
