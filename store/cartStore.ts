import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage'

// export const useCart = create(
//     persist((set)=>({
//         items: [],

//         addProduct: (product: any, quantity: any) => 
//             {
//                 set((state: any) => ({
//                     items: [...state.items, { product, quantity }],
//                 }));
//             },
        
//         removeProduct: (product: any) => 
//             set((state: any) => ({
//                 items: state.items.filter((item: any) => item.product !== product),
//             })),
        
//         resetCart: () => set({ items: [] }),
//     }), {
//         name: 'cart-store',
//         storage: createJSONStorage(() => AsyncStorage),
//     })
// )

export const useCart = create((set) => ({
    items: [],

    addProduct: (product: any, quantity: any) => 
        {
            set((state: any) => ({
                items: [...state.items, { product, quantity }],
            }));
        },
    
    removeProduct: (product: any) => 
        set((state: any) => ({
            items: state.items.filter((item: any) => item.product !== product),
        })),
    
    resetCart: () => set({ items: [] }),
}));
