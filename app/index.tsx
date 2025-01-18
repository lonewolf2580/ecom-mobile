import { FlatList, Text, View } from "react-native";
import products from '@/assets/products.json'
import ProductList from "@/components/productListItem";

export default function HomeScreen() {
  return (
    <View>
      <FlatList 
        data={products} 
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        renderItem={({item})=> {
        return <ProductList product={item} />
      }} />
      
    </View>
  );
}
