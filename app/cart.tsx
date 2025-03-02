import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { FlatList, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/orders";
import { useAuth } from "@/store/authStore";
import { Icon } from "@/components/ui/icon";
import { Delete } from "lucide-react-native";


export default function CartScreen() {
  const items = useCart((state: any) => state.items)
  const resetCart = useCart((state: any) => state.resetCart) 
  const removeFromCart = useCart((state: any) => state.removeProduct) 
  // const token = useAuth((state: any) => state.token)


  // const createOrderMutation = useMutation({
  //   mutationFn: () => createOrder(items.map((item: any) => ({
  //     productId: item.product.id, 
  //     quantity: item.quantity,
  //     price: item.product.price
  //   })), token),
  //   onSuccess: (data) => {
  //     console.log("Order Created", data)
  //     resetCart()
  //   },
  //   onError: (error) => {
  //     console.log("Order Failed", error)
  //   }
  // })

  const removeFromCartFn = (item: any) => {
    // Send Order to Server
    console.log(items);
    removeFromCart(item)
    console.log(items);
  }

  const onCheckout = async () => {
    // Send Order to Server
    // createOrderMutation.mutate()
  }

  if (items.length === 0) {
    return <Redirect href={'/'}/>
  }

  return (
    <FlatList 
      data={items} 
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      renderItem={({item})=> {
        return (
          <HStack className="justify-between bg-white p-3">
            <VStack space="sm">
              <Text bold>{item.product.name}</Text>
              <Text bold>${item.product.price}</Text>
            </VStack>
              
            <Text bold>{item.quantity}</Text>

            {/* <Pressable onPress={()=>removeFromCartFn(item)} className="hover:bg-red-300 rounded-full w-10 h-10"><Icon size="lg" as={Delete} className="text-red-700 h-full w-8" /></Pressable> */}
          </HStack>
        )
      }}
      ListFooterComponent={()=>(
        <Button onPress={onCheckout} className="w-full p-3 bg-primary-500">
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
