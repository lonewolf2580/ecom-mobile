import { Text } from "@/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";
import products from '@/assets/products.json'
import { Card } from "@/components/ui/card";
import { VStack } from '@/components/ui/vstack';
import { Image } from '@/components/ui/image';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { fetchProductById } from "@/api/products";
import { ActivityIndicator } from "react-native";
import { useCart } from "@/store/cartStore";
import { stat } from "fs";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { Id } from "@/convex/_generated/dataModel";
import { Input, InputField } from "@/components/ui/input";
import { HStack } from "@/components/ui/hstack";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [inCart, setInCart] = useState(false)
  const [quantity, setQuantity] = useState("1")
  const product = useQuery(api.userFunctions.getProductById, {id: id as Id<"products">});

  const addProduct = useCart((state: any) => state.addProduct)
  const cartItems = useCart((state: any) => state.items)

  useEffect(()=>{
    if (product?._id == id) {
      setIsLoading(false)
    }
  }, [product])

  if (product && cartItems.find((item: any)=> item.name == product?.name)) {
    setInCart(true)
  }

  const addToCart = () => {
    addProduct(product, quantity)
    console.log(cartItems);
  }

  if (isLoading) {
      return <ActivityIndicator />
    }
  
    // if(error) {
    //   return <Text>Product not found</Text>
    // }

  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{title: product?.name}} />
      <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
        <Image
          source={{
            uri: `https://pastel-chinchilla-353.convex.site/getImage?storageId=${product?.image}`,
          }}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt={`${product?.name} image`}
          resizeMode='contain'
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product?.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            ${product?.price}
          </Heading>
          <Heading size="md" className="mb-4">
            Seller Email: {product?.seller}
          </Heading>
          <Text size="sm">
            {product?.description}
          </Text>
          <HStack space="2xl">
            <Text bold size="2xl">Quantity</Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField placeholder="Enter Quantity you want to purchase" value={quantity} onChangeText={(text)=> setQuantity(text)} />
            </Input>
          </HStack>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button disabled={inCart} onPress={addToCart} className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
            <ButtonText size="sm">{inCart? "Already in Cart" : "Add to cart"}</ButtonText>
          </Button>
          {/* <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button> */}

        </Box>
      </Card>
    </Box>
  );
}

export default ProductDetailsScreen;