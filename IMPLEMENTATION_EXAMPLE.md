# Search & Filter Implementation Guide

## Overview

This implementation adds advanced search and filtering without changing the existing UI. Users can:

1. Search by name using the search bar
2. Click the filter button to open a modal with advanced filters
3. Filter by specialization, location, and appointment date

## Installation Required

```bash
npx expo install @react-native-community/datetimepicker
```

## Usage Example in `app/(home)/index.tsx`

```tsx
import {
  Header,
  SearchBar,
  FilterModal,
  FilterOptions,
} from "@/components/home-page";
import CategoriesSlide from "@/components/home-page/categories-slide";
import ListDoctors from "@/components/home-page/list-doctors";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [inputSearch, setInputSearch] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    specialization: [],
    location: "",
    appointmentDate: null,
  });

  const username = "Fady";

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    console.log("Applied filters:", filters);
    // The ListDoctors component will use these filters
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-bg-secondary">
      <View className="flex-1 px-6">
        <Header userName={username} />
        <SearchBar
          value={inputSearch}
          onChangeText={(text) => setInputSearch(text)}
          onFilterPress={() => setShowFilterModal(true)}
        />
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <CategoriesSlide />
          <ListDoctors searchQuery={inputSearch} filters={activeFilters} />
        </ScrollView>
      </View>

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
      />
    </SafeAreaView>
  );
}
```

## Update ListDoctors Component

Add filter props to `list-doctors.tsx`:

```tsx
interface ListDoctorsProps {
  searchQuery?: string | null;
  filters?: FilterOptions;
}

export default function ListDoctors({ searchQuery, filters }: ListDoctorsProps = {}) {
  // Import the helper function
  const filteredDoctors = useMemo(() => {
    if (!searchQuery && (!filters ||
        (filters.specialization.length === 0 &&
         !filters.location &&
         !filters.appointmentDate))) {
      return doctors; // No filters, return all
    }

    return filterDoctors(doctors, searchQuery || "", filters || {
      specialization: [],
      location: "",
      appointmentDate: null,
    });
  }, [searchQuery, filters]);

  // Use filteredDoctors instead of doctors in FlashList
  return (
    <View ...>
      <FlashList data={filteredDoctors} ... />
    </View>
  );
}
```

## Features

### 1. **Text Search**

- Users type in the search bar
- Searches doctor name, location, and specialization
- Real-time filtering as they type

### 2. **Filter Modal**

- Appears when user taps the green filter button
- Slides up from bottom (native iOS/Android feel)
- Organized in sections:

#### Specialization

- Multi-select chip buttons
- Shows all available specializations
- "All Specializations" resets the filter

#### Location

- Single-select chip buttons
- Filter by specific areas
- "All Locations" shows everywhere

#### Appointment Date

- Date picker for selecting desired appointment date
- Can be cleared with X button
- Helps find doctors with availability

### 3. **Apply/Reset**

- **Reset**: Clears all filters
- **Apply**: Applies filters and closes modal

## Benefits

✅ **No UI Changes**: Existing search bar stays the same
✅ **Progressive Disclosure**: Advanced options hidden until needed
✅ **Mobile-First**: Bottom sheet pattern familiar to mobile users
✅ **Flexible**: Easy to add more filter options later
✅ **Performant**: Filters applied in memory, no API calls needed initially

## Future Enhancements

1. Add filter badge count on filter button
2. Save filter preferences to AsyncStorage
3. Add "Availability" filter (morning/afternoon/evening)
4. Add "Rating" range filter
5. Add "Distance" radius filter with map
6. Add "Accepting New Patients" toggle
7. Connect appointment date to real availability API
