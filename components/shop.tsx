import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Heading } from '@/components/ui/heading';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

export default function ProductList({ product }: { product: any }) {
    return(
        <Link href={{
            pathname:`/product/[id]`,
            params: { id: product._id}
        }} asChild>
            <Pressable className='flex-1'>
                <Card className="p-5 rounded-lg flex-1">
                <Image
                    source={{
                    uri: `${process.env.CONVEX_SITE_URL}/getImage?storageId=${product.image}`,
                    }}
                    className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
                    alt={`${product.name} image`}
                    resizeMode='contain'
                />
                <Text className="text-sm font-normal mb-2 text-typography-700">
                    {product.name}
                </Text>
                    <Heading size="md" className="mb-4">
                    ${product.price}
                    </Heading>
                </Card>
            </Pressable>
        </Link>
    )
  }
//   {products.map((product, index) => {
//                 // product.image = image(product.image);
//                 return (
//                   <View key={index} className='bg-white rounded-lg p-5'>
//                     <Text style={{ fontWeight: 'bold' }}>{product.name}</Text>
//                     <Text>{product.description}</Text>
//                     <Image src={'https://pastel-chinchilla-353.convex.site/getImage?storageId='+product.image} source={'https://pastel-chinchilla-353.convex.site/getImage?storageId='+product.image} style={{ width: 100, height: 100 }} />
//                     <Text>${product.price}</Text>
//                   </View>
//                 );
//               })}
  