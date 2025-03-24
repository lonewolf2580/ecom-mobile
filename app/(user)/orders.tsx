import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { HStack } from '@/components/ui/hstack';
import { it } from 'node:test';
import OrderItem from '@/components/OrderItem';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';

export default function Orders() {
  const [loading, setLoading] = useState(true)
  const [Orders, setOrders] = useState<{ _id: Id<"orders">; _creationTime: number; status?: string; user: string; deliveryAddress: string; products: { name: string; _id: string; quantity: number; price: number; seller: string; }[]; total: number; vat: number; deliveryFee: number; paid?: boolean; paidSeller?: boolean; }[]>([])
  const allOrders = useQuery(api.userFunctions.getOrdersByUserEmail, {email: useQuery(api.userFunctions.currentUser)?.email || ''});
  useEffect(() => {
    if (allOrders?.length) {
      setOrders(allOrders.reverse())
      setLoading(false);
    }
  }, [allOrders]);

  if (loading) {
      return <ActivityIndicator />
  }
  
  return (
    <Box>
      <Heading>All Orders</Heading>
      {Orders.map((item)=>(
        <OrderItem order={item} />
      ))}
    </Box>
  )
}