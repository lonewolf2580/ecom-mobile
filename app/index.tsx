import { FlatList, useWindowDimensions, View } from "react-native";
import products from '@/assets/products.json'
import ProductList from "@/components/productListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";

export default function HomeScreen() {
  // const { width } = useWindowDimensions()
  // const numColums = width > 700 ? 4 : 2

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4
  })

  return (
    <View>
      <FlatList 
        key={numColumns}
        data={products} 
        numColumns={numColumns}
        contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
        columnWrapperClassName="gap-2"
        renderItem={({item})=> {
        return <ProductList product={item} />
      }} />
      
    </View>
  );
}
