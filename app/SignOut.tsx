import React from 'react'
import { Button } from '@/components/ui/button'
import { useAuthActions } from "@convex-dev/auth/react";
import { Icon } from '@/components/ui/icon';
import { LogOutIcon } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SignOut() {
    const { signOut } = useAuthActions();
  return (
    <Button onPress={()=> {
      signOut();
      router.replace('/')
    }} className='bg-slate-500 p-3 m-1'><Icon size='xl' as={LogOutIcon} className='text-white font-bold' /></Button>
  )
}