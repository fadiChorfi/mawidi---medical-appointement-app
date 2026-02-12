import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../../global.css";

export default function HomeLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#20504b",
          tabBarStyle: { height: 70, paddingBottom: 15 },
        }}
      >
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
          name="saved"
          options={{
            title: "saved",
            tabBarIcon: () => {
              return (
                <Image
                  source={require("@/assets/icons/heart.png")}
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
