import { ActivityIndicator, FlatList } from "react-native";
// import products from '@/assets/products.json'
import ProductList from "@/components/productListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';

export default function HomeScreen() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<{ _id: string; _creationTime: number; name: string; image: string; price: number; seller: string; description: string; }[]>([])
    const allProducts = useQuery(api.userFunctions.getProducts);
    
      useEffect(() => {
        if (allProducts?.length) {
          setProducts(allProducts);
          setLoading(false);
        }
      }, [allProducts]);
    
 
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4
  })

  if (loading) {
    return <ActivityIndicator />
  }

  // if(error) {
  //   return <Text>Error fetching products</Text>
  // }

  return (
    <FlatList 
      key={numColumns}
      data={products.reverse()} 
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({item})=> {
      return <ProductList product={item} />
    }} />
  );
}
