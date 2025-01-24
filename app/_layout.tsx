import { Link, Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User } from "lucide-react-native";
import { Pressable } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";

const queryClient = new QueryClient()

export default function RootLayout() {
  const cartItemsNum = useCart((state: any) => state.items.length)

  return (
    <QueryClientProvider client={queryClient}>
        <GluestackUIProvider mode="light">
        <Stack screenOptions={{ 
          headerRight: () => 
            cartItemsNum > 0 &&(
            <Link href={"/cart"} asChild>
              <Pressable className="flex-row gap-2 mr-2">
                <Icon className="mr-0" size="xl" as={ShoppingCart} />
                <Text>{cartItemsNum}</Text>
              </Pressable>
            </Link>
           ),
           headerLeft: () => 
            <Link href={"/login"} asChild>
              <Pressable className="flex-row gap-2 mr-10 ml-2">
                <Icon size="xl" as={User} />
              </Pressable>
            </Link>
          }}
          >
          <Stack.Screen name="index" options={{ title: 'Shop' }} />
          <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
    
  )
}
