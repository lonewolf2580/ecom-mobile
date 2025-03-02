import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function createOrder(items: any, token:string) {
    try {
        const response = await fetch(
          `${API_URL}/orders`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization : token,
            },
            body: JSON.stringify({
                order: {},
                items: items
            })
          }
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        throw Error('Failed to create order')
    }
    
}