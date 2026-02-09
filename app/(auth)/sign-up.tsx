import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Signing up with:", {
        name,
        email,
        password,
        confirmPassword,
      });
      router.push("/(home)");
    }
  };
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
      <View className="flex-3 px-6 items-center  gap-6 bg-white rounded-4xl ">
        <View className="flex-1 w-full pt-12  ">
          <Text className="text-3xl font-bold mb-6">
            Join <Text className="text-green">DoctaLink</Text>
          </Text>
          <View className=" flex flex-col gap-12">
            <View className="flex flex-col gap-4">
              <View>
                <Text className="text-sm font-semibold text-primary mb-2">
                  Full Name
                </Text>
                <TextInput
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={setName}
                  className="border border-gray-300 rounded-lg px-4 py-3"
                />
              </View>

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
                  secureTextEntry
                  className="border border-gray-300 rounded-lg px-4 py-3"
                />
              </View>

              <View>
                <Text className="text-sm font-semibold text-primary mb-2">
                  Confirm Password
                </Text>
                <TextInput
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
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
                  Sign Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
                <Text className="text-primary/85 text-center font-medium ">
                  Already have an account?{" "}
                  <Text className="font-bold">Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
