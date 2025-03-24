import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import * as SecureStore from "expo-secure-store";
import { Link, Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AddIcon, Icon } from "@/components/ui/icon";
import { Home, ListCheckIcon, ShoppingBag, ShoppingCart, User } from "lucide-react-native";
import { Platform, Pressable } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import SignOut from "./SignOut";



const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
  verbose: true
});
 
const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};


export default function RootLayout() {
  const cartItemsNum = useCart((state: any) => state.items.length)

  // const isLoggedIn = useAuth((state: any) => !!state.token);

  return (
    <ConvexAuthProvider
      client={convex}
      storage={
        Platform.OS === "android" || Platform.OS === "ios"
          ? secureStorage
          : undefined
      }
    >
        <GluestackUIProvider mode="light">
        <Stack screenOptions={{ 
          headerRight: () => (
            <>
              {cartItemsNum > 0 && (
                <Link href={"/cart"} asChild>
                  <Pressable className="flex-row gap-2 mr-2">
                    <Icon className="mr-0" size="xl" as={ShoppingCart} />
                    <Text>{cartItemsNum}</Text>
                  </Pressable>
                </Link>
              )}
              <Authenticated>
                <SignOut />
              </Authenticated>
            </>
          )           
          }}
          >
          <Stack.Screen name="index" options={{ 
            title: 'Shop',
            headerLeft: () => 
              <Unauthenticated>
                <Link href={"/login"} asChild>
                  <Pressable className="flex-row gap-2 mr-10 ml-2">
                    <Icon size="xl" as={User} />
                  </Pressable>
                </Link>
              </Unauthenticated>
          }} />
          <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
          <Stack.Screen name="(auth)/login" options={{ title: 'Login' }} />
          <Stack.Screen name="(user)/profile" options={{ title: 'Profile' }} />
          <Stack.Screen name="(user)/orders" options={{ title: 'Orders' }} />
          <Stack.Screen name="(seller)/view-products" options={{ title: 'View Product' }} />
          <Stack.Screen name="(seller)/add" options={{ title: 'View Product' }} />
          <Stack.Screen name="cart" options={{ title: 'Cart' }} />
        </Stack>
        
        <Authenticated>
          <HStack space="lg" className="align-middle justify-center h-15 py-3">
            <Text className="text-lg">Happy Shopping!</Text>
            <Link href={"/"}>
              <Icon as={Home} size="xl" />
            </Link>

            <Link href={"/orders"}>
              <Icon as={ShoppingBag} size="xl" />
            </Link>

            <Link href={"/add"}>
              <Icon as={AddIcon} size="xl" />
            </Link>

            <Link href={"/view-products"}>
              <Icon as={ListCheckIcon} size="xl" />
            </Link>

            <Link href={"/profile"}>
              <Icon as={User} size="xl" />
            </Link>
          </HStack>
        </Authenticated>
        <Unauthenticated>
          <HStack space="lg" className="align-middle justify-center h-15 py-3">
            <Text className="text-lg">Happy Shopping!</Text>
            <Link href={"/"}>
              <Icon as={Home} size="xl" />
            </Link>

            <Link href={"/login"}>
              <Icon as={User} size="xl" />
            </Link>
          </HStack>
        </Unauthenticated>
      </GluestackUIProvider>
    </ConvexAuthProvider>
  )
}
