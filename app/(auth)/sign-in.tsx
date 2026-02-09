import { Image, View } from "react-native";

export default function SignIn() {
  return (
    <View className="flex-1 justify-center  bg-primary ">
      <View className="flex-1 items-center justify-center gap-6 bg-transparent relative ">
        <Image
          source={require("@/assets/icons/circle1.png")}
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            right: -100,
            top: -100,
          }}
        />
        <Image
          source={require("@/assets/icons/circle2.png")}
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            left: -60,
            bottom: -60,
          }}
        />
      </View>
      <View className="flex-2 items-center justify-center gap-6 bg-white rounded-4xl "></View>
    </View>
  );
}
