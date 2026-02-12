import { SymbolView } from "expo-symbols";
import { useEffect as useReactEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const TabTitle = ({
  icon,
  label,
  isActive,
  fontLoaded,
  showTitle = true,
}: {
  icon: string;
  label: string;
  isActive: boolean;
  fontLoaded: boolean;
  showTitle?: boolean;
}) => {
  const progress = useSharedValue(isActive ? 1 : 0);

  useReactEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: 250 });
  }, [isActive]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.4, 1]),
    transform: [
      { scale: interpolate(progress.value, [0, 1], [0.92, 1]) },
      { translateY: interpolate(progress.value, [0, 1], [2, 0]) },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ["#8b8b8b", "#fff"]),
  }));

  return (
    <Animated.View style={[styles.tabTitle, containerStyle]}>
      <SymbolView
        name={icon as any}
        size={15}
        tintColor={isActive ? "#fff" : "#8b8b8b"}
      />
      {showTitle && (
        <Animated.Text
          style={[
            styles.tabLabel,
            textStyle,
            fontLoaded && { fontFamily: "SfProRounded" },
          ]}
        >
          {label}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
});
