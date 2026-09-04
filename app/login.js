import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const passwordInput = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }

  function showUnavailable(action) {
    Alert.alert(
      action,
      "Authentication is not connected yet. You can return to the welcome screen and use Start Learning without an account.",
    );
  }

  function logIn() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Enter your password.");
      return;
    }
    setError("");
    showUnavailable("Log In");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="grow px-6 pt-2 pb-3"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to welcome"
              onPress={goBack}
              className="mr-2 h-11 w-11 items-center justify-center"
            >
              <Ionicons name="arrow-back" size={26} color="#20202F" />
            </Pressable>
            <Text className="text-2xl font-bold text-ink">Welcome Back</Text>
          </View>
          <Text className="mt-2 text-[15px] leading-[22px] text-[#6E6A82]">
            Sign in to synchronize your progress and load all logged study
            history dynamically.
          </Text>

          <Text
            nativeID="email-label"
            className="mb-2 mt-4 text-sm font-semibold text-[#6E6A82]"
          >
            Email Address
          </Text>
          <TextInput
            accessibilityLabel="Email Address"
            accessibilityLabelledBy="email-label"
            value={email}
            onChangeText={setEmail}
            placeholder="alex@example.com"
            placeholderTextColor="#9995A8"
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.current?.focus()}
            className="min-h-[46px] rounded-[18px] border border-[#ECEBF2] bg-white px-4 py-3 text-[15px] text-ink"
          />
          <Text
            nativeID="password-label"
            className="mb-2 mt-4 text-sm font-semibold text-[#6E6A82]"
          >
            Password
          </Text>
          <TextInput
            ref={passwordInput}
            accessibilityLabel="Password"
            accessibilityLabelledBy="password-label"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#9995A8"
            secureTextEntry
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="go"
            onSubmitEditing={logIn}
            className="min-h-[46px] rounded-[18px] border border-[#ECEBF2] bg-white px-4 py-3 text-[15px] text-ink"
          />

          <View className="mt-2 flex-row flex-wrap items-center justify-between">
            <Pressable
              accessibilityRole="checkbox"
              accessibilityLabel="Remember me"
              accessibilityState={{ checked: rememberMe }}
              onPress={() => setRememberMe((value) => !value)}
              className="min-h-11 flex-row items-center"
            >
              <View
                className={`mr-2 h-5 w-5 items-center justify-center rounded-md border ${rememberMe ? "border-[#6257E8] bg-[#6257E8]" : "border-[#AAA6BB] bg-white"}`}
              >
                {rememberMe && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text className="text-sm font-semibold text-ink">
                Remember me
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => showUnavailable("Forgot password?")}
              className="min-h-11 justify-center"
            >
              <Text className="text-sm font-semibold text-primary">
                Forgot password?
              </Text>
            </Pressable>
          </View>
          {error ? (
            <Text
              accessibilityRole="alert"
              accessibilityLiveRegion="polite"
              className="mt-2 text-sm text-red-700"
            >
              {error}
            </Text>
          ) : null}

          <View className="min-h-8 flex-1" />
          <Pressable
            accessibilityRole="button"
            onPress={logIn}
            className="min-h-14 items-center justify-center rounded-full bg-[#6257E8] px-5 py-4"
          >
            <Text className="text-base font-bold text-white">Log In</Text>
          </Pressable>
          <View className="mt-2 flex-row flex-wrap items-center justify-center">
            <Text className="text-sm text-[#6E6A82]">
              Don&apos;t have an account?{" "}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => showUnavailable("Create account")}
              className="min-h-11 justify-center"
            >
              <Text className="text-sm font-semibold text-primary underline">
                Create one
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
