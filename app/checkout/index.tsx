import React from 'react';
import { WebView } from 'react-native-webview';
import { router } from 'expo-router';
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export default function PaystackCheckout({  authorization_url, reference }: {authorization_url: string, reference: string}) {
  const userData = useQuery(api.userFunctions.currentUser);
  const completePayment = useMutation(api.userFunctions.payment_approval);
  const PS_Payment_VerifyCALLER = useMutation(api.userFunctions.PS_Payment_VerifyCALLER);

  // const authorization_url = 'https://checkout.paystack.com/luKuasMan';
  const callback_url = 'https://yourcallback.com';

  const onNavigationStateChange = (state: any) => {
 
    const { url } = state;

    if (!url) return;

    if (url === callback_url) {
			// get transaction reference from url and verify transaction, then redirect

      // const redirectTo = 'window.location = "' + callback_url + '"';
      // this.webview.injectJavaScript(redirectTo);
      router.push('/orders')
    }
		
		if(url === 'https://standard.paystack.co/close') {
      // handle webview removal
      // You can either unmount the component, or
      // Use a navigator to pop off the view
    }
  };

  return (
    <WebView 
      source={{ uri: authorization_url }}
      style={{ marginTop: 40 }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
}