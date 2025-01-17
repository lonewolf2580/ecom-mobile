import { FlatList, Text, View } from "react-native";
import products from '@/assets/products.json'
import ProductList from "@/components/productListItem";
import { Button, ButtonText } from "@/components/ui/button";

export default function HomeScreen() {
  return (
    <Button variant="outline">
      <ButtonText>Click me</ButtonText>
    </Button>
    // <View>
    //   <FlatList data={products} renderItem={({item})=> {
    //     return <ProductList product={item} />
    //   }} />
      
    // </View>
  );
}
