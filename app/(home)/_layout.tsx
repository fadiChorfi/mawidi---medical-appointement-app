import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function HomeLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs screenOptions={{ tabBarActiveTintColor: "#20504b" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: () => {
              return (
                <Image
                  source={require("@/assets/icons/home.png")}
                  style={{ width: 24, height: 24 }}
                />
              );
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarIcon: () => {
              return (
                <Image
                  source={require("@/assets/icons/notification-bing.png")}
                  style={{ width: 24, height: 24 }}
                />
              );
            },
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="reservations"
          options={{
            title: "Reservations",
            tabBarIcon: () => {
              return (
                <Image
                  source={require("@/assets/icons/reservations.png")}
                  style={{ width: 24, height: 24 }}
                />
              );
            },
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: () => {
              return (
                <Image
                  source={require("@/assets/icons/profile.png")}
                  style={{ width: 24, height: 24 }}
                />
              );
            },
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}
