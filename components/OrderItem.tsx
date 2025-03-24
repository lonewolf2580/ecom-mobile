import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Heading } from '@/components/ui/heading';
import { Link, router } from 'expo-router';
import { Pressable } from 'react-native';
import { HStack } from './ui/hstack';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button, ButtonText } from './ui/button';
import { VStack } from './ui/vstack';

export default function OrderItem({ order }: { order: any }) {

    const completePayment = (order_id: any)=>{
        // router.push(`/checkout?order_id=${order_id}`)
    }

    return(
        <>
            <HStack space='md' className='border p-2'>
                <Text className='capitalize'>{dayjs(order._creationTime).fromNow().toUpperCase()}</Text>
                {/* <Text>{order._id}</Text> */}
                <VStack>
                    {order.products.map((product:any)=>(
                        <>
                            <Text>{product.name} from {product.seller}</Text>
                        </>
                    ))}
                    <Text bold size='2xl'>Status: {!order.status ? "Pending Payment" : order.status}</Text>
                </VStack>
                <VStack>
                    <Text>${order.total.toLocaleString()}</Text>
                    <Text>VAT: ${order.vat.toLocaleString()}</Text>
                    <Text>Delivery: ${order.deliveryFee.toLocaleString()}</Text>
                </VStack>
                {!order.paid&& <Button onPress={completePayment} className='w-20 m-1 rounded-lg'>
                <ButtonText>Pay</ButtonText>
            </Button>}
            </HStack>
        </>
        
    )
  }