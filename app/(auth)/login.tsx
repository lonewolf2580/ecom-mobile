import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { Redirect } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
 
export default function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
    <Unauthenticated>
      <View className="flex-1 justify-center p-4 bg-gray-100">
        <TextInput
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        inputMode="email"
        autoCapitalize="none"
        />
        <TextInput
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Password(Alphanumeric, 8+ characters)"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        />
        <Button
        title={step === "signIn" ? "Sign in" : "Sign up"}
        onPress={() => {
          void signIn("password", { email, password, flow: step });
        }}
        />
        
        <Button
        title={step === "signIn" ? "Don't have an Account? Sign up" : "Already Have an Account? Sign in"}
        onPress={() => setStep(step === "signIn" ? "signUp" : "signIn")}
        />
      </View>
    </Unauthenticated>

    <Authenticated>
        <Redirect href={'/'} />
    </Authenticated>
    </>
  );
}