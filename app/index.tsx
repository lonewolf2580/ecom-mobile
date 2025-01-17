import { FlatList, Text, View } from "react-native";
import products from '@/assets/products.json'
import ProductList from "@/components/productListItem";

export default function HomeScreen() {
  return (
    <View>
      <FlatList data={products} renderItem={({item})=> {
        return <ProductList product={item} />
      }} />
      
    </View>
  );
}
