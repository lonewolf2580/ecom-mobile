import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { useMutation } from "@tanstack/react-query";
import { login, signUp } from "@/api/auth";
import { useAuth } from "@/store/authStore";
import { Link, Redirect } from "expo-router";
	
export default function LoginScreen() {
          const [showPassword, setShowPassword] = useState(false);
          const [name, setName] = useState("");
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");

        const setUser = useAuth((state: any) => state.setUser);
        const setToken = useAuth((state: any) => state.setToken);
        const isLoggedIn = useAuth((state: any) => !!state.token);

        // const loginMutation = useMutation({ 
        //     mutationFn: () => login(email, password), 
        //     onSuccess: (data) => {
        //         console.log("Logged in");
        //         if(data.user && data.token) {
        //             setUser(data.user);
        //             setToken(data.token);
        //         }
        //     },
        //     onError: () => console.log("Login failed")
        // });

        const signUpMutation = useMutation({ 
            mutationFn: () => signUp(name, email, password), 
            onSuccess: (data) => {
                console.log("Registered Successfully", data)
                if(data.user && data.token) {
                    setUser(data.user);
                    setToken(data.token);
                }
            },
            onError: (error) => console.log("Registration failed", error)
        });

          const handleState = () => {
            setShowPassword((showState) => {
              return !showState;
            });
          };

        if (isLoggedIn) {
            return <Redirect href={'/'}/>
        }

          return (
            <FormControl isInvalid={signUpMutation.status == 'error'} className="p-4 border rounded-lg max-w-[500px] border-outline-300 bg-white m-2">
              <VStack space="xl">
                <Heading className="text-typography-900 pt-3">Login</Heading>
                <VStack space="xs">
                  <Text className="text-typography-500">Name</Text>
                  <Input className="min-w-[250px]">
                    <InputField value={name} onChangeText={setName} type="text" />
                  </Input>
                </VStack>
                <VStack space="xs">
                  <Text className="text-typography-500">Email</Text>
                  <Input className="min-w-[250px]">
                    <InputField value={email} onChangeText={setEmail} type="text" />
                  </Input>
                </VStack>
                <VStack space="xs">
                  <Text className="text-typography-500">Password</Text>
                  <Input className="text-center">
                    <InputField value={password} onChangeText={setPassword} type={showPassword ? "text" : "password"} />
                    <InputSlot className="pr-3" onPress={handleState}>
                      <InputIcon
                        as={showPassword ? EyeIcon : EyeOffIcon}
                      />
                    </InputSlot>
                  </Input>
                </VStack>
                <HStack space="sm">
                    <Text className="text-typography-500">Already have an account? </Text>
                    <Link href="../" className="font-bold underline">Login</Link>
                    <Button onPress={()=> signUpMutation.mutate()} className="flex-1" variant="outline">
                        <ButtonText>Register</ButtonText>
                    </Button>

                    {/* <Button onPress={()=> loginMutation.mutate()} className="flex-1">
                        <ButtonText>Login</ButtonText>
                    </Button> */}
                </HStack>
                
              </VStack>
            </FormControl>
          );
        }