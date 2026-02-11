# SearchBar Usage Guide - Optional Filters

The SearchBar component is designed to handle all filters as **optional**. You can use any combination of name search, location filter, and date filter.

## Component Interface

```typescript
interface SearchBarProps {
  value: string | null; // Name search - OPTIONAL
  onChangeText: (text: string) => void;
  onFilterPress?: () => void; // OPTIONAL
  activeFilters?: {
    // OPTIONAL
    location?: string; // OPTIONAL
    date?: string; // OPTIONAL
    additionalCount?: number; // OPTIONAL
  };
  onClearFilters?: () => void; // OPTIONAL
}
```

## Usage Examples

### 1. Basic Search (Name Only)

```tsx
<SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  onFilterPress={() => setShowModal(true)}
/>
// Result: Only shows search input, no filter chips
```

### 2. Location Filter Only

```tsx
<SearchBar
  value={null}
  onChangeText={() => {}}
  onFilterPress={() => setShowModal(true)}
  activeFilters={{
    location: "Manhattan",
  }}
  onClearFilters={() => clearLocation()}
/>
// Result: Shows "Manhattan" chip below search bar
```

### 3. Date Filter Only

```tsx
<SearchBar
  value={null}
  onChangeText={() => {}}
  onFilterPress={() => setShowModal(true)}
  activeFilters={{
    date: "Available Feb 12",
  }}
  onClearFilters={() => clearDate()}
/>
// Result: Shows "Available Feb 12" chip below search bar
```

### 4. Name + Location

```tsx
<SearchBar
  value="Dr. Sarah"
  onChangeText={setSearchQuery}
  onFilterPress={() => setShowModal(true)}
  activeFilters={{
    location: "Manhattan",
  }}
  onClearFilters={() => clearFilters()}
/>
// Result: Search input has "Dr. Sarah", shows "Manhattan" chip
```

### 5. All Filters Combined

```tsx
<SearchBar
  value="Dr. Sarah"
  onChangeText={setSearchQuery}
  onFilterPress={() => setShowModal(true)}
  activeFilters={{
    location: "Manhattan",
    date: "Available Feb 12",
    additionalCount: 2, // Shows "+2 more"
  }}
  onClearFilters={() => clearAllFilters()}
/>
// Result: All filters visible
```

## Implementation in index.tsx

```tsx
import { useState } from "react";
import { SearchBar, FilterModal, FilterOptions } from "@/components/home-page";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    specialization: [],
    location: "",
    appointmentDate: null,
  });

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({
      specialization: [],
      location: "",
      appointmentDate: null,
    });
  };

  // Format active filters for display
  const activeFilters = {
    location: filters.location || undefined,
    date: filters.appointmentDate
      ? `Available ${filters.appointmentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
      : undefined,
    additionalCount: filters.specialization.length,
  };

  return (
    <View>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => setShowFilterModal(true)}
        activeFilters={activeFilters}
        onClearFilters={handleClearFilters}
      />

      <ListDoctors searchQuery={searchQuery} filters={filters} />

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
}
```

## Filter Logic in ListDoctors

```tsx
export default function ListDoctors({
  searchQuery,
  filters
}: {
  searchQuery?: string;
  filters?: FilterOptions
}) {
  const filteredDoctors = useMemo(() => {
    let results = [...doctors];

    // 1. Filter by name (OPTIONAL)
    if (searchQuery && searchQuery.trim()) {
      results = results.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Filter by location (OPTIONAL)
    if (filters?.location && filters.location.trim()) {
      results = results.filter(doc =>
        doc.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // 3. Filter by specialization (OPTIONAL)
    if (filters?.specialization && filters.specialization.length > 0) {
      results = results.filter(doc =>
        filters.specialization.includes(doc.specialization as string)
      );
    }

    // 4. Filter by date (OPTIONAL)
    if (filters?.appointmentDate) {
      // Check availability for the date
      // This would connect to your availability API
      console.log('Filter by date:', filters.appointmentDate);
    }

    return results;
  }, [searchQuery, filters]);

  return (
    <FlashList data={filteredDoctors} ... />
  );
}
```

## Key Points

✅ **All filters are optional** - Use any combination you want
✅ **Name search** - Works independently via the search input
✅ **Location filter** - Applied from filter modal
✅ **Date filter** - Applied from filter modal
✅ **Filter chips** - Only show when filters are active
✅ **Clear All** - Removes all filters at once
✅ **Independent** - Each filter can be used alone or combined

## Empty States

- **No filters active**: Only search bar shows, no chips below
- **Only name search**: Search input has text, no chips
- **Only filters**: Chips show below, search input empty
- **All empty**: Clean state, users can search or filter

This design follows the pattern of modern apps where users can:

1. Just type a name to search
2. Just filter by location/date
3. Combine both for precise results
