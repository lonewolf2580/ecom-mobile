import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { useState } from "react";
import { HStack } from "@/components/ui/hstack";
	
export default function LoginScreen() {
          const [showPassword, setShowPassword] = useState(false);

          const handleState = () => {
            setShowPassword((showState) => {
              return !showState;
            });
          };

          return (
            <FormControl className="p-4 border rounded-lg max-w-[500px] border-outline-300 bg-white m-2">
              <VStack space="xl">
                <Heading className="text-typography-900 pt-3">Login</Heading>
                <VStack space="xs">
                  <Text className="text-typography-500">Email</Text>
                  <Input className="min-w-[250px]">
                    <InputField type="text" />
                  </Input>
                </VStack>
                <VStack space="xs">
                  <Text className="text-typography-500">Password</Text>
                  <Input className="text-center">
                    <InputField type={showPassword ? "text" : "password"} />
                    <InputSlot className="pr-3" onPress={handleState}>
                      <InputIcon
                        as={showPassword ? EyeIcon : EyeOffIcon}
                      />
                    </InputSlot>
                  </Input>
                </VStack>
                <HStack space="sm">
                    <Button className="flex-1" variant="outline">
                        <ButtonText>Register</ButtonText>
                    </Button>

                    <Button className="flex-1">
                        <ButtonText>Login</ButtonText>
                    </Button>
                </HStack>
                
              </VStack>
            </FormControl>
          );
        }