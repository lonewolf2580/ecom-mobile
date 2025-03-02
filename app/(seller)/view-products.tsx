import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from '@/components/ui/image';
import { useMutation, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import ProductList from '@/components/productListItem';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';

  
export default function ViewProducts() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<{ _id: string; _creationTime: number; name: string; image: string; price: number; seller: string; description: string; }[]>([])
    
  const userData = useQuery(api.userFunctions.currentUser);
  const productsBySeller = useQuery(api.userFunctions.getProductsBySellerEmail, { email: userData?.email ?? '' }) || [];

  useEffect(() => {
    if (productsBySeller) {
      setProducts(productsBySeller.reverse());
      setLoading(false);
    }
  }, [productsBySeller]);

  const convexSiteUrl = process.env.EXPO_PUBLIC_CONVEX_URL

  const image = async (storageId: string) => {
    // e.g. https://happy-animal-123.convex.site/getImage?storageId=456
    const getImageUrl = new URL(`${convexSiteUrl}/getImage`);
    await getImageUrl.searchParams.set("storageId", storageId);
    console.log(getImageUrl);

    return getImageUrl.href
  }

  const numColumns = useBreakpointValue({
      default: 2,
      sm: 3,
      xl: 4
  })

  return (
    <>
      {!loading ? (
        <>
          <Text className='p-5 font-extrabold underline'>Products You Listed</Text>
          <FlatList 
            key={numColumns}
            data={products} 
            numColumns={numColumns}
            contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
            columnWrapperClassName="gap-2"
            renderItem={({item})=> {
            return <ProductList product={item} />
          }} />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
}