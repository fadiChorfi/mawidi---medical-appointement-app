import { AuthContext } from "@/utils/auth-context";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignIn() {
  const { logIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (email && password) {
      logIn();
      router.push("/(home)");
    }
  };
  const router = useRouter();
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
      <View className="flex-1 px-6 items-center  gap-6 bg-white rounded-4xl ">
        <View className="flex-1 w-full pt-12  ">
          <Text className="text-3xl font-bold mb-6">
            Welcome <Text className="text-green">Back</Text>
          </Text>
          <View className=" flex flex-col gap-12">
            <View className="flex flex-col gap-4">
              <View>
                <Text className="text-sm font-semibold text-primary mb-2">
                  Email
                </Text>
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="border border-gray-300 rounded-lg px-4 py-3"
                />
              </View>

              <View>
                <Text className="text-sm font-semibold text-primary mb-2">
                  Password
                </Text>
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  className="border border-gray-300 rounded-lg px-4 py-3"
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => handleSignIn()}
                className="bg-primary rounded-lg py-3 mb-4"
              >
                <Text className="text-white text-center font-semibold text-lg">
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(auth)/sign-up");
                }}
              >
                <Text className="text-black-text text-center font-medium ">
                  D&apos;ont have an account?{" "}
                  <Text className="font-bold text-primary ">Join Us</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
