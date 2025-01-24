import { create } from "zustand";

export const useCart = create((set) => ({
    items: [],

    addProduct: (product: any) => 
        set((state: any) => ({ 
            items: [...state.items, { product, quantity: 1 }], 
        })),
    
    removeProduct: (product: any) => 
        set((state: any) => ({
            items: state.items.filter((item: any) => item.product !== product),
        })),
    
    resetCart: () => set({ items: [] }),
}));
