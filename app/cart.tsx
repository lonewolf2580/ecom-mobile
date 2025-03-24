import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { FlatList, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect, router } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { useState } from "react";
// import Checkout from "./checkout";
import { useMutation, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export default function CartScreen() {
  const [checkout, setCheckout] = useState(false)
  const userData = useQuery(api.userFunctions.currentUser);
  const items = useCart((state: any) => state.items)
  const resetCart = useCart((state: any) => state.resetCart) 
  const removeFromCart = useCart((state: any) => state.removeProduct)
  const createOrder = useMutation(api.userFunctions.createOrder);

  const removeFromCartFn = (item: any) => {
    // Send Order to Server
    console.log(items);
    removeFromCart(item)
    console.log(items);
  }

  const onCheckout = async () => {
    // Send Order to Server
    const order = await createOrder({
      user: userData?.email || '',
      deliveryAddress: userData?.address || '',
      products: items.map((item: any) => ({
          _id: item.product._id as Id<"products">,
          name: item.product.name,
          price: item.product.price,
          quantity: parseFloat(item.quantity),
          seller: item.product.seller,
      })),
        vat: ((total/100)*0.7),
        deliveryFee: ((total/100)*1),
        amountPaid: total,
    })

  if (order) {
    alert("Order Completed")
    resetCart()
    router.push('/orders')
  } else {
    alert("Failed! Try again")
  }
    // setCheckout(true)
    // resetCart()
  }

  if (items.length === 0) {
    return <Redirect href={'/'}/>
  }
  let total = 0

  return (
    <FlatList 
      data={items} 
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      ListHeaderComponent={()=>(
        <HStack space="4xl" className="ml-2 py-2">
          {/* <Heading>Products in Cart</Heading> */}
          <Pressable onPress={()=>resetCart()} className="hover:bg-red-300 rounded-full p-2 border">
            <Text bold>Clear Cart</Text>
            {/* <Icon size="lg" as={Delete} className="text-red-700 h-full w-8" /> */}
          </Pressable>
        </HStack>
      )}
      renderItem={({item})=> {
        total += Number(item.product.price) * Number(item.quantity)
        return (
          <HStack className="justify-between bg-white p-3">
              <Image source={{
                uri: `https://pastel-chinchilla-353.convex.site/getImage?storageId=${item.product.image}`,
              }}/>
            <VStack space="sm">
              <Text bold>{item.product.name}</Text>
              {/* <Text bold>${item.product.price +"x"+ item.quantity + "= $"+item.product.price*item.quantity}</Text> */}
              <Text bold>${(item.product.price*item.quantity).toLocaleString()}</Text>
            </VStack>
              
            <Text bold>{item.quantity}</Text>

          </HStack>
        )
      }}
      ListFooterComponent={()=>(
        <>
          <Text>VAT: ${((total/100)*0.7).toFixed(2)}</Text>
          <Text>Delivery Fee: ${((total/100)*1).toFixed(2)}</Text>
          {!checkout &&<Button onPress={onCheckout} className="w-full p-3 bg-primary-500">
          <ButtonText>Checkout ${total.toLocaleString()}</ButtonText>
        </Button>}
        </>
      )}
    />
  );
}
